const { checkers, Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const axios = require('axios');
const forge = require('node-forge');

const SERVICIO_FIRMA_CERTIFICADO = 'firma_certificado';

// Configuración hardcodeada para desarrollo


const getBasicAuthHeader = () => {
  const credentials = `${CONFIG.clientId}:${CONFIG.clientSecret}`;
  const base64Credentials = Buffer.from(credentials).toString('base64');
  return `Basic ${base64Credentials}`;
};

const obtenerTokenExterno = async () => {
  const response = await axios({
    method: 'POST',
    url: `${CONFIG.baseUrl}/feauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getBasicAuthHeader(),
    },
    data: new URLSearchParams({
      username: CONFIG.username,
      password: CONFIG.password,
      grant_type: CONFIG.grantType,
    }).toString(),
  });

  return response.data;
};

const firmarDocumentoExterno = async (pkcs7, claveDocumento, tipoServicio, accessToken) => {
  const response = await axios({
    method: 'POST',
    url: `${CONFIG.baseUrl}/firmadocumento`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    },
    data: new URLSearchParams({
      pkcs7,
      clavedocumento: claveDocumento,
      tiposervicio: tipoServicio,
    }).toString(),
  });

  return response.data;
};

const generarPKCS7 = (archivoCer, archivoKey, passwordKey, objetoPorFirmar) => {
  try {
    // Decodificar certificado .cer (Base64 -> DER -> PEM)
    const cerDer = forge.util.decode64(archivoCer);
    const cerAsn1 = forge.asn1.fromDer(cerDer);
    const certificate = forge.pki.certificateFromAsn1(cerAsn1);

    // Decodificar llave privada .key (Base64 -> DER)
    const keyDer = forge.util.decode64(archivoKey);
    const keyAsn1 = forge.asn1.fromDer(keyDer);

    // Descifrar la llave privada con la contraseña
    let privateKey;
    try {
      // Intentar como PKCS#8 encriptado
      const privateKeyInfo = forge.pki.decryptPrivateKeyInfo(keyAsn1, passwordKey);
      privateKey = forge.pki.privateKeyFromAsn1(privateKeyInfo);
    } catch (e) {
      // Intentar como PKCS#8 sin encriptar
      try {
        privateKey = forge.pki.privateKeyFromAsn1(keyAsn1);
      } catch (e2) {
        throw new Error('No se pudo descifrar la llave privada. Verifique la contraseña.');
      }
    }

    // Crear el mensaje PKCS#7 firmado
    const p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(objetoPorFirmar, 'utf8');
    p7.addCertificate(certificate);
    p7.addSigner({
      key: privateKey,
      certificate,
      digestAlgorithm: forge.pki.oids.sha256,
      authenticatedAttributes: [
        {
          type: forge.pki.oids.contentType,
          value: forge.pki.oids.data,
        },
        {
          type: forge.pki.oids.messageDigest,
        },
        {
          type: forge.pki.oids.signingTime,
          value: new Date(),
        },
      ],
    });

    // Firmar
    p7.sign();

    // Convertir a DER y luego a Base64
    const derBuffer = forge.asn1.toDer(p7.toAsn1()).getBytes();
    const pkcs7Base64 = forge.util.encode64(derBuffer);

    return pkcs7Base64;
  } catch (error) {
    Logger.error(`[firma-certificado] Error al generar PKCS7: ${error.message}`);
    throw boom.badRequest(`Error al generar PKCS7: ${error.message}`);
  }
};

const isTokenExpired = (tokenExterno) => {
  if (!tokenExterno) return true;
  const now = new Date();
  const fechaExpiracion = new Date(tokenExterno.fechaExpiracion);
  return now >= fechaExpiracion;
};

const createFirmaCertificado = (
  findOneCatalogoFirmaElectronicaQuery,
  findOneTokenExternoQuery,
  createTokenExternoQuery,
  updateTokenExternoQuery,
  createDocumentoFirmadoQuery,
) => async (data, { folioDocumento }) => {
  const {
    archivoCer,
    archivoKey,
    passwordKey,
    objetoPorFirmar,
    folioInterno,
  } = data;

  // 1. Buscar el catálogo por claveDocumento
  const catalogo = await findOneCatalogoFirmaElectronicaQuery({
    claveDocumento: folioDocumento,
  });
  checkers.throwErrorIfDataIsFalsy(catalogo, 'catalogo-firma-electronica', folioDocumento);

  // 2. Generar PKCS7
  Logger.info('[firma-certificado] Generando PKCS7');
  const pkcs7 = generarPKCS7(archivoCer, archivoKey, passwordKey, objetoPorFirmar);
  Logger.info('[firma-certificado] PKCS7 generado exitosamente');

  // 3. Buscar token existente
  let tokenExterno = await findOneTokenExternoQuery({
    servicio: SERVICIO_FIRMA_CERTIFICADO,
    activo: true,
  });

  // 4. Obtener o renovar token si expiró
  if (isTokenExpired(tokenExterno)) {
    Logger.info('[firma-certificado] Token expirado o no existe, solicitando nuevo token');

    try {
      const tokenResponse = await obtenerTokenExterno();

      const tokenData = {
        servicio: SERVICIO_FIRMA_CERTIFICADO,
        accessToken: tokenResponse.access_token,
        tokenType: tokenResponse.token_type || 'bearer',
        expiresIn: String(tokenResponse.expires_in),
        fechaObtencion: new Date(),
        fechaExpiracion: new Date(Date.now() + tokenResponse.expires_in * 1000),
        activo: true,
      };

      if (tokenExterno) {
        tokenExterno = await updateTokenExternoQuery(
          { id: tokenExterno.id },
          tokenData,
        );
      } else {
        tokenExterno = await createTokenExternoQuery(tokenData);
      }

      Logger.info('[firma-certificado] Token obtenido exitosamente');
    } catch (error) {
      Logger.error(`[firma-certificado] Error al obtener token: ${error.message}`);
      throw boom.badGateway('Error al obtener token del servicio de firma electrónica');
    }
  }

  // 5. Llamar al servicio de firma
  Logger.info('[firma-certificado] Enviando documento a firmar');

  let firmaResponse;
  try {
    firmaResponse = await firmarDocumentoExterno(
      pkcs7,
      catalogo.claveDocumento,
      catalogo.tipoServicio,
      tokenExterno.accessToken,
    );
  } catch (error) {
    Logger.error(`[firma-certificado] Error al firmar documento: ${error.message}`);
    Logger.error(`[firma-certificado] Response data: ${JSON.stringify(error.response?.data)}`);
    Logger.error(`[firma-certificado] Response status: ${error.response?.status}`);
    throw boom.badGateway('Error al firmar documento con servicio externo');
  }

  // 6. Validar respuesta del servicio
  if (!firmaResponse || !firmaResponse.identificadorunico) {
    Logger.error('[firma-certificado] Respuesta inválida del servicio de firma');
    throw boom.badGateway('Respuesta inválida del servicio de firma electrónica');
  }

  // 7. Guardar documento firmado
  const documentoFirmado = await createDocumentoFirmadoQuery({
    catalogoFirmaElectronicaId: catalogo.id,
    objetoPorFirmar,
    pkcs7,
    folioInterno,
    identificadorUnico: firmaResponse.identificadorunico,
    hashObjetoFirmado: firmaResponse.hashobjetofirmado,
    secuenciaDocumento: firmaResponse.secuenciadocumento,
    datosFirmante: firmaResponse.datosfirmante,
    objetoFirmado: firmaResponse.objetofirmado,
    firmaResponse: firmaResponse.firmaresponse,
    uriValidacion: firmaResponse.urivalidacion,
    tipoDocumento: firmaResponse.tipodocumento,
    identificadorDocumento: firmaResponse.identificadordocumento,
    dependenciaDocumento: firmaResponse.dependenciadocumento,
    firmaDigital: firmaResponse.firmadigital,
    estatusFirmado: 'exitoso',
    fechaFirmado: firmaResponse.fechafirmado ? new Date(firmaResponse.fechafirmado) : new Date(),
  });

  Logger.info(`[firma-certificado] Documento firmado exitosamente: ${documentoFirmado.id}`);

  return documentoFirmado;
};

module.exports = createFirmaCertificado;
