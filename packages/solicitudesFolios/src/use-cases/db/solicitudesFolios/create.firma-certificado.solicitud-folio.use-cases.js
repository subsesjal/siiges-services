const { checkers, Logger } = require('@siiges-services/shared');
const axios = require('axios');
const { config } = require('../../../../config/environment');

const SERVICIO_FIRMA_CERTIFICADO = 'firma_certificado';

const TIPO_DOCUMENTO_CATALOGO = {
  certificado: 'D001',
  certificadoElectronico: 'D001',
};

const getBasicAuthHeader = () => {
  const { clientId, clientSecret } = config.firmaElectronica;
  const credentials = `${clientId}:${clientSecret}`;
  const base64Credentials = Buffer.from(credentials).toString('base64');
  return `Basic ${base64Credentials}`;
};

const obtenerTokenExterno = async () => {
  const { baseUrl, username, password } = config.firmaElectronica;

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
  return response.data;
};

const firmarDocumentoExterno = async (pkcs7, claveDocumento, tipoServicio, accessToken) => {
  const { baseUrl } = config.firmaElectronica;

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

  return response.data;
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
) => async (data, { folioInterno }) => {
  const { pkcs7, objetoPorFirmar, tipoDocumento } = data;

  const claveDocumentoCatalogo = TIPO_DOCUMENTO_CATALOGO[tipoDocumento];

  if (!claveDocumentoCatalogo) {
    throw new Error(`Tipo de documento no soportado: ${tipoDocumento}`);
  }

  Logger.info(`[firma-certificado] Tipo documento: ${tipoDocumento} -> Clave catálogo: ${claveDocumentoCatalogo}`);

  const catalogo = await findOneCatalogoFirmaElectronicaQuery({
    claveDocumento: claveDocumentoCatalogo,
  });
  checkers.throwErrorIfDataIsFalsy(catalogo, 'catalogo-firma-electronica', claveDocumentoCatalogo);

  Logger.info('[firma-certificado] Guardando documento antes de firmar');
  let documentoFirmado = await createDocumentoFirmadoQuery({
    catalogoFirmaElectronicaId: catalogo.id,
    objetoPorFirmar: JSON.stringify(objetoPorFirmar),
    pkcs7,
    folioInterno,
    estatusFirmado: 'pendiente',
  });

  let tokenExterno = await findOneTokenExternoQuery({
    servicio: SERVICIO_FIRMA_CERTIFICADO,
    activo: true,
  });

  if (isTokenExpired(tokenExterno)) {
    Logger.info('[firma-certificado] Token expirado o no existe, solicitando nuevo token');

    const tokenResponse = await obtenerTokenExterno();

    const tokenData = {
      servicio: SERVICIO_FIRMA_CERTIFICADO,
      accessToken: tokenResponse.access_token,
      tokenType: tokenResponse.token_type,
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

    Logger.info('[firma-certificado] Token almacenado exitosamente');
  }

  Logger.info('[firma-certificado] Enviando documento a firmar');

  const firmaResponse = await firmarDocumentoExterno(
    pkcs7,
    catalogo.claveDocumento,
    catalogo.tipoServicio,
    tokenExterno.accessToken,
  );

  Logger.info(`[firma-certificado] Respuesta recibida: ${JSON.stringify(firmaResponse)}`);

  if (!firmaResponse || firmaResponse.error || !firmaResponse.identificadorunico) {
    Logger.warn(`[firma-certificado] Servicio respondió con error o sin identificador: ${JSON.stringify(firmaResponse)}`);

    documentoFirmado = await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        estatusFirmado: 'rechazado',
        firmaResponse: JSON.stringify(firmaResponse),
      },
    );

    return {
      folioInterno: documentoFirmado.folioInterno,
      estatusFirmado: documentoFirmado.estatusFirmado,
    };
  }

  documentoFirmado = await updateDocumentoFirmadoQuery(
    { id: documentoFirmado.id },
    {
      identificadorUnico: firmaResponse.identificadorunico,
      hashObjetoFirmado: firmaResponse.hashobjetofirmado,
      secuenciaDocumento: firmaResponse.secuenciadocumento,
      datosFirmante: firmaResponse.datosfirmante,
      objetoFirmado: firmaResponse.objetofirmado,
      firmaResponse: JSON.stringify(firmaResponse),
      uriValidacion: firmaResponse.urivalidacion,
      tipoDocumento: firmaResponse.tipodocumento,
      identificadorDocumento: firmaResponse.identificadordocumento,
      dependenciaDocumento: firmaResponse.dependenciadocumento,
      firmaDigital: firmaResponse.firmadigital,
      estatusFirmado: 'exitoso',
      fechaFirmado: firmaResponse.fechafirmado
        ? new Date(firmaResponse.fechafirmado)
        : new Date(),
    },
  );

  Logger.info(`[firma-certificado] Documento firmado exitosamente: ${documentoFirmado.id}`);

  return {
    folioInterno: documentoFirmado.folioInterno,
    estatusFirmado: documentoFirmado.estatusFirmado,
  };
};

module.exports = createFirmaCertificado;