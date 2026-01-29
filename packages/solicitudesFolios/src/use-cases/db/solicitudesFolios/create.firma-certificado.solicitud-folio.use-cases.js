const { checkers, Logger } = require('@siiges-services/shared');
const axios = require('axios');
const { config } = require('../../../../config/environment');

const SERVICIO_FIRMA_CERTIFICADO = 'firma_certificado';

const getBasicAuthHeader = () => {
  const { clientId, clientSecret } = config.firmaElectronica;
  const credentials = `${clientId}:${clientSecret}`;
  const base64Credentials = Buffer.from(credentials).toString('base64');
  return `Basic ${base64Credentials}`;
};

const obtenerTokenExterno = async () => {
  const { baseUrl, username, password } = config.firmaElectronica;

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
  const {
    pkcs7,
    objetoPorFirmar,
  } = data;

  if (!pkcs7) {
    throw new Error('El campo pkcs7 es requerido');
  }

  const catalogo = await findOneCatalogoFirmaElectronicaQuery({
    claveDocumento: folioInterno,
  });
  checkers.throwErrorIfDataIsFalsy(catalogo, 'catalogo-firma-electronica', folioInterno);

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

    try {
      const tokenResponse = await obtenerTokenExterno();

      if (!tokenResponse.success) {
        Logger.error(`[firma-certificado] Servicio de token respondió con error: ${JSON.stringify(tokenResponse.data)}`);

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

    documentoFirmado = await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        estatusFirmado: 'error_conexion',
        firmaResponse: `Error de conexión al firmar: ${error.message}`,
      },
    );

    return documentoFirmado;
  }

  if (!firmaResponse.success) {
    Logger.warn(`[firma-certificado] Servicio respondió con error: ${JSON.stringify(firmaResponse.data)}`);

    documentoFirmado = await updateDocumentoFirmadoQuery(
      { id: documentoFirmado.id },
      {
        estatusFirmado: 'rechazado',
        firmaResponse: JSON.stringify(firmaResponse.data),
      },
    );

    return documentoFirmado;
  }

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
