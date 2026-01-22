const { checkers, Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const axios = require('axios');
const forge = require('node-forge');
const { config } = require('../../../../config/environment');

const SERVICIO_FIRMA_CERTIFICADO = 'firma_certificado';

const getBasicAuthHeader = () => {
  const { clientId, clientSecret } = config.firmaElectronica;
  const credentials = `${clientId}:${clientSecret}`;
  const base64Credentials = Buffer.from(credentials).toString('base64');
  return `Basic ${base64Credentials}`;
};

const obtenerTokenExterno = async () => {
  const {
    baseUrl, username, password,
  } = config.firmaElectronica;

  try {
    const response = await axios({
      method: 'POST',
      url: `${baseUrl}/feauth/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: getBasicAuthHeader(),
      },
      data: new URLSearchParams({
        username,
        password,
        grant_type: 'password',
      }).toString(),
    });

    Logger.info('[firma-certificado] Token obtenido exitosamente');

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        data: error.response.data,
        status: error.response.status,
      };
    }
    throw error;
  }
};

const firmarDocumentoExterno = async (pkcs7, claveDocumento, tipoServicio, accessToken) => {
  const { baseUrl } = config.firmaElectronica;

  try {
    const response = await axios({
      method: 'POST',
      url: `${baseUrl}/rest/firmadocumento`,
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

    return { success: true, data: response.data };
  } catch (error) {
    // Capturar la respuesta de error del servicio externo
    if (error.response) {
      return {
        success: false,
        data: error.response.data,
        status: error.response.status,
      };
    }
    // Error de red u otro error
    throw error;
  }
};

const generarPKCS7 = (archivoCer, archivoKey, passwordKey, objetoPorFirmar) => {
  try {
    // Asegurar que el objeto esté minificado (sin saltos de línea ni espacios extra)
    let jsonMinificado;
    try {
      const parsed = JSON.parse(objetoPorFirmar);
      jsonMinificado = JSON.stringify(parsed); // Esto elimina saltos de línea y espacios extra
    } catch (e) {
      // Si no es JSON válido, usar tal cual pero quitar saltos de línea
      jsonMinificado = objetoPorFirmar.replace(/\n/g, '').replace(/\s+/g, ' ');
    }

    Logger.info(`[firma-certificado] JSON minificado: ${jsonMinificado}`);

    // Decodificar certificado .cer (Base64 -> DER -> PEM)
    const cerDer = forge.util.decode64(archivoCer);
    const cerAsn1 = forge.asn1.fromDer(cerDer);
    const certificate = forge.pki.certificateFromAsn1(cerAsn1);

    // Log de validez del certificado
    Logger.info(`[firma-certificado] Certificado válido desde: ${certificate.validity.notBefore}`);
    Logger.info(`[firma-certificado] Certificado válido hasta: ${certificate.validity.notAfter}`);

    // Decodificar llave privada .key (Base64 -> DER)
    const keyDer = forge.util.decode64(archivoKey);
    const keyAsn1 = forge.asn1.fromDer(keyDer);

    // Descifrar la llave privada con la contraseña
    let privateKey;
    try {
      const privateKeyInfo = forge.pki.decryptPrivateKeyInfo(keyAsn1, passwordKey);
      privateKey = forge.pki.privateKeyFromAsn1(privateKeyInfo);
    } catch (e) {
      try {
        privateKey = forge.pki.privateKeyFromAsn1(keyAsn1);
      } catch (e2) {
        throw new Error('No se pudo descifrar la llave privada. Verifique la contraseña.');
      }
    }

    // Crear el mensaje PKCS#7 firmado
    const p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(jsonMinificado, 'utf8');
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

    p7.sign();

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
  updateDocumentoFirmadoQuery,
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

  // 3. Guardar documento firmado (antes de llamar API)
  Logger.info('[firma-certificado] Guardando documento antes de firmar');
  let documentoFirmado = await createDocumentoFirmadoQuery({
    catalogoFirmaElectronicaId: catalogo.id,
    objetoPorFirmar,
    pkcs7,
    folioInterno,
    estatusFirmado: 'pendiente',
  });

  // 4. Buscar token existente
  let tokenExterno = await findOneTokenExternoQuery({
    servicio: SERVICIO_FIRMA_CERTIFICADO,
    activo: true,
  });

  // 5. Obtener o renovar token si expiró
  if (isTokenExpired(tokenExterno)) {
    Logger.info('[firma-certificado] Token expirado o no existe, solicitando nuevo token');

    try {
      const tokenResponse = await obtenerTokenExterno();

      // Verificar si el servicio de token respondió con error
      if (!tokenResponse.success) {
        Logger.error(`[firma-certificado] Servicio de token respondió con error: ${JSON.stringify(tokenResponse.data)}`);

        await updateDocumentoFirmadoQuery(
          { id: documentoFirmado.id },
          {
            estatusFirmado: 'error_token',
            firmaResponse: JSON.stringify(tokenResponse.data),
          },
        );

        // Devolver el documento con el error
        documentoFirmado = await updateDocumentoFirmadoQuery(
          { id: documentoFirmado.id },
          {
            estatusFirmado: 'error_token',
            firmaResponse: JSON.stringify(tokenResponse.data),
          },
        );

        return documentoFirmado;
      }

      const tokenData = {
        servicio: SERVICIO_FIRMA_CERTIFICADO,
        accessToken: tokenResponse.data.access_token,
        tokenType: tokenResponse.data.token_type || 'bearer',
        expiresIn: String(tokenResponse.data.expires_in),
        fechaObtencion: new Date(),
        fechaExpiracion: new Date(Date.now() + tokenResponse.data.expires_in * 1000),
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
      Logger.error(`[firma-certificado] Error de conexión al obtener token: ${error.message}`);

      // Actualizar documento con error de conexión
      documentoFirmado = await updateDocumentoFirmadoQuery(
        { id: documentoFirmado.id },
        {
          estatusFirmado: 'error_conexion',
          firmaResponse: `Error de conexión al obtener token: ${error.message}`,
        },
      );

      return documentoFirmado;
    }
  }

  // 6. Llamar al servicio de firma
  Logger.info('[firma-certificado] Enviando documento a firmar');

  let firmaResponse;
  try {
    firmaResponse = await firmarDocumentoExterno(
      pkcs7,
      catalogo.claveDocumento,
      catalogo.tipoServicio,
      tokenExterno.accessToken,
    );
    Logger.info(`[firma-certificado] Respuesta recibida: ${JSON.stringify(firmaResponse)}`);
  } catch (error) {
    Logger.error(`[firma-certificado] Error de conexión al firmar: ${error.message}`);

    // Actualizar documento con error de conexión
    documentoFirmado = await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        estatusFirmado: 'error_conexion',
        firmaResponse: `Error de conexión al firmar: ${error.message}`,
      },
    );

    return documentoFirmado;
  }

  // 7. Manejar respuesta del servicio (exitosa o con error de negocio)
  if (!firmaResponse.success) {
    Logger.warn(`[firma-certificado] Servicio respondió con error: ${JSON.stringify(firmaResponse.data)}`);

    // Guardar la respuesta de error en la BD
    documentoFirmado = await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        estatusFirmado: 'rechazado',
        firmaResponse: JSON.stringify(firmaResponse.data),
      },
    );

    // Devolver el documento con el error del servicio
    return documentoFirmado;
  }

  // 8. Validar respuesta exitosa tenga los campos requeridos
  if (!firmaResponse.data || !firmaResponse.data.identificadorunico) {
    Logger.error('[firma-certificado] Respuesta exitosa pero sin identificador único');

    documentoFirmado = await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        estatusFirmado: 'error_respuesta',
        firmaResponse: `Respuesta sin identificador único: ${JSON.stringify(firmaResponse.data)}`,
      },
    );

    return documentoFirmado;
  }

  // 9. Actualizar documento firmado con respuesta exitosa
  documentoFirmado = await updateDocumentoFirmadoQuery(
    { id: documentoFirmado.id },
    {
      identificadorUnico: firmaResponse.data.identificadorunico,
      hashObjetoFirmado: firmaResponse.data.hashobjetofirmado,
      secuenciaDocumento: firmaResponse.data.secuenciadocumento,
      datosFirmante: firmaResponse.data.datosfirmante,
      objetoFirmado: firmaResponse.data.objetofirmado,
      firmaResponse: JSON.stringify(firmaResponse.data),
      uriValidacion: firmaResponse.data.urivalidacion,
      tipoDocumento: firmaResponse.data.tipodocumento,
      identificadorDocumento: firmaResponse.data.identificadordocumento,
      dependenciaDocumento: firmaResponse.data.dependenciadocumento,
      firmaDigital: firmaResponse.data.firmadigital,
      estatusFirmado: 'exitoso',
      fechaFirmado: firmaResponse.data.fechafirmado
        ? new Date(firmaResponse.data.fechafirmado)
        : new Date(),
    },
  );

  Logger.info(`[firma-certificado] Documento firmado exitosamente: ${documentoFirmado.id}`);

  return documentoFirmado;
};

module.exports = createFirmaCertificado;
