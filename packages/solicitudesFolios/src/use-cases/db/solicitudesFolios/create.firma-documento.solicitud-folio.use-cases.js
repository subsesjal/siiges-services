const { Logger } = require('@siiges-services/shared');
const axios = require('axios');
const { config } = require('../../../../config/environment');

const SERVICIO_FIRMA_DOCUMENTO = 'firma_documento';
const BATCH_SIZE = 5;

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

  Logger.info('[firma-documento] Token obtenido exitosamente');
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

const firmarUnDocumento = async (
  documento,
  catalogo,
  tokenExterno,
  createDocumentoFirmadoQuery,
  updateDocumentoFirmadoQuery,
) => {
  const {
    pkcs7,
    folioInterno,
    objetoPorFirmar,
    autoridad,
  } = documento;

  Logger.info(`[firma-documento] Procesando documento: ${folioInterno}`);

  let documentoFirmado = await createDocumentoFirmadoQuery({
    catalogoFirmaElectronicaId: catalogo.id,
    objetoPorFirmar: JSON.stringify(objetoPorFirmar),
    pkcs7,
    folioInterno,
    estatusFirmado: 'pendiente',
    tipoFirmante: autoridad.tipoFirmante,
    cargoFirmante: autoridad.cargoFirmante,
    curpFirmante: autoridad.curp,
    nombreFirmante: autoridad.nombre,
  });

  let firmaResponse;
  try {
    firmaResponse = await firmarDocumentoExterno(
      pkcs7,
      catalogo.claveDocumento,
      catalogo.tipoServicio,
      tokenExterno.accessToken,
    );
  } catch (err) {
    const errorMsg = err.response?.data
      ? JSON.stringify(err.response.data)
      : err.message;

    Logger.warn(`[firma-documento] Error al firmar ${folioInterno}: ${errorMsg}`);

    documentoFirmado = await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        estatusFirmado: 'rechazado',
        firmaResponse: errorMsg,
      },
    );

    return {
      folioInterno: documentoFirmado.folioInterno,
      estatusFirmado: documentoFirmado.estatusFirmado,
    };
  }

  if (!firmaResponse || firmaResponse.error || !firmaResponse.identificadorunico) {
    Logger.warn(`[firma-documento] Firma rechazada para ${folioInterno}`);

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

  Logger.info(`[firma-documento] Documento firmado exitosamente: ${folioInterno}`);

  return {
    folioInterno: documentoFirmado.folioInterno,
    estatusFirmado: documentoFirmado.estatusFirmado,
  };
};

const procesarDocumentos = async (
  documentos,
  catalogo,
  findOneTokenExternoQuery,
  createTokenExternoQuery,
  updateTokenExternoQuery,
  createDocumentoFirmadoQuery,
  updateDocumentoFirmadoQuery,
) => {
  let tokenExterno = await findOneTokenExternoQuery({
    servicio: SERVICIO_FIRMA_DOCUMENTO,
    activo: true,
  });

  if (isTokenExpired(tokenExterno)) {
    Logger.info('[firma-documento] Token expirado o no existe, solicitando nuevo token');

    const tokenResponse = await obtenerTokenExterno();

    const tokenData = {
      servicio: SERVICIO_FIRMA_DOCUMENTO,
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

    Logger.info('[firma-documento] Token almacenado exitosamente');
  }

  const resultados = [];

  for (let i = 0; i < documentos.length; i += BATCH_SIZE) {
    const lote = documentos.slice(i, i + BATCH_SIZE);

    // eslint-disable-next-line no-await-in-loop
    const resultadosLote = await Promise.all(
      lote.map((documento) => firmarUnDocumento(
        documento,
        catalogo,
        tokenExterno,
        createDocumentoFirmadoQuery,
        updateDocumentoFirmadoQuery,
      )),
    );

    resultados.push(...resultadosLote);
  }

  const exitosos = resultados.filter((r) => r.estatusFirmado === 'exitoso').length;
  const rechazados = resultados.filter((r) => r.estatusFirmado === 'rechazado').length;

  Logger.info(`[firma-documento] Proceso completado: ${exitosos} exitosos, ${rechazados} rechazados`);

  return resultados;
};

const createFirmaDocumento = (
  findOneCatalogoFirmaElectronicaQuery,
  findOneTokenExternoQuery,
  createTokenExternoQuery,
  updateTokenExternoQuery,
  createDocumentoFirmadoQuery,
  updateDocumentoFirmadoQuery,
) => async (documentos) => {
  if (!Array.isArray(documentos) || documentos.length === 0) {
    throw new Error('Se requiere al menos un documento para firmar');
  }

  const primerDocumento = documentos[0];
  const { tipoDocumento } = primerDocumento;

  if (!tipoDocumento) {
    throw new Error('El campo tipoDocumento es requerido');
  }

  Logger.info(`[firma-documento] Buscando catálogo para tipoDocumento: ${tipoDocumento}`);

  const catalogo = await findOneCatalogoFirmaElectronicaQuery({
    claveDocumento: tipoDocumento,
  });

  if (!catalogo) {
    throw new Error(`No se encontró configuración en catálogo para tipo de documento: ${tipoDocumento}`);
  }

  Logger.info(`[firma-documento] Catálogo encontrado: ${catalogo.nombre} -> ${catalogo.claveDocumento}`);
  Logger.info(`[firma-documento] Procesando ${documentos.length} documento(s) en lotes de ${BATCH_SIZE}`);

  return procesarDocumentos(
    documentos,
    catalogo,
    findOneTokenExternoQuery,
    createTokenExternoQuery,
    updateTokenExternoQuery,
    createDocumentoFirmadoQuery,
    updateDocumentoFirmadoQuery,
  );
};

module.exports = createFirmaDocumento;
