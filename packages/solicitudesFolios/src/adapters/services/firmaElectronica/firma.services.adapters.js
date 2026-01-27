const axios = require('axios');
const { Logger } = require('@siiges-services/shared');
const { config } = require('../../../../config/environment');

/**
 * Servicio para firma de documentos en el API de Firma Electrónica
 */
const firmaService = {
  /**
   * Firma un documento electrónicamente
   * @param {Object} payload - Datos para la firma
   * @param {string} payload.pkcs7 - Cadena PKCS7 del documento
   * @param {string} payload.clavedocumento - Código del tipo de documento
   * @param {string} payload.tiposervicio - Descripción del servicio (opcional)
   * @param {string} accessToken - Token de autenticación
   * @returns {Promise<Object>} Respuesta del servicio de firma
   */
  async firmarDocumento(payload, accessToken) {
    try {
      const { feBaseUrl } = config;

      if (!feBaseUrl) {
        throw new Error('La URL base del servicio de Firma Electrónica no está configurada');
      }

      if (!payload.pkcs7) {
        throw new Error('El campo pkcs7 es requerido para firmar el documento');
      }

      if (!payload.clavedocumento) {
        throw new Error('El campo clavedocumento es requerido para firmar el documento');
      }

      if (!accessToken) {
        throw new Error('El token de acceso es requerido para firmar el documento');
      }

      const url = `${feBaseUrl}/rest/firmadocumento`;

      Logger.info(`[firma-service]: Enviando documento a firmar: ${url}`);
      Logger.info(`[firma-service]: Clave documento: ${payload.clavedocumento}`);

      const response = await axios({
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
        data: new URLSearchParams({
          pkcs7: payload.pkcs7,
          clavedocumento: payload.clavedocumento,
          tiposervicio: payload.tiposervicio || '',
        }).toString(),
      });

      if (!response.data) {
        throw new Error('La respuesta del servicio de firma está vacía');
      }

      Logger.info(`[firma-service]: Documento firmado exitosamente. Folio: ${response.data.foliovalidacion}`);

      return {
        foliovalidacion: response.data.foliovalidacion,
        hashobjetofirmado: response.data.hashobjetofirmado,
        iddocumento: response.data.iddocumento,
        datosfirmante: response.data.datosfirmante,
        objetofirmado: response.data.objetofirmado,
        firmaresponse: response.data.firmaresponse,
        urivalidacion: response.data.urivalidacion,
        tipodocumento: response.data.tipodocumento,
      };
    } catch (error) {
      Logger.error('[firma-service]: Error al firmar documento');

      if (error.response) {
        Logger.error(`[firma-service]: Status: ${error.response.status}`);
        Logger.error(`[firma-service]: Data: ${JSON.stringify(error.response.data)}`);

        // Errores específicos del servicio
        if (error.response.status === 401) {
          const errorData = error.response.data;
          if (errorData && errorData.error === 'invalid_token') {
            throw new Error('Token de acceso inválido o expirado. Se requiere renovación');
          }
          throw new Error('No autorizado para firmar documento. Verifica el token de acceso');
        }

        if (error.response.status === 400) {
          throw new Error('Solicitud inválida. Verifica los datos del documento a firmar');
        }

        if (error.response.status === 503) {
          throw new Error('Servicio de Firma Electrónica temporalmente no disponible');
        }
      }

      throw new Error(`Error al conectar con el servicio de firma: ${error.message}`);
    }
  },
};

module.exports = firmaService;
