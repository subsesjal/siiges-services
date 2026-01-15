const axios = require('axios');
const { Logger } = require('@siiges-services/shared');
const { config } = require('../../../../config/environment');

/**
 * Servicio para autenticación en el API de Firma Electrónica
 */
const authService = {
  /**
   * Obtiene un token de acceso del servicio de Firma Electrónica
   * @returns {Promise<Object>} Token de autenticación
   */
  async obtenerToken() {
    try {
      const {
        feBaseUrl,
        feClientId,
        feClientSecret,
        feUsername,
        fePassword,
      } = config;

      if (!feBaseUrl || !feClientId || !feClientSecret || !feUsername || !fePassword) {
        throw new Error('Faltan configuraciones requeridas para Firma Electrónica en variables de entorno');
      }

      // Crear credenciales en formato Basic Auth (Base64)
      const credentials = Buffer.from(`${feClientId}:${feClientSecret}`).toString('base64');

      const url = `${feBaseUrl}/feauth/token`;

      Logger.info(`[auth-service]: Solicitando token a ${url}`);

      const response = await axios({
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        data: new URLSearchParams({
          username: feUsername,
          password: fePassword,
          grant_type: 'password',
        }).toString(),
      });

      if (!response.data || !response.data.access_token) {
        throw new Error('La respuesta del servicio de autenticación no contiene un token válido');
      }

      Logger.info('[auth-service]: Token obtenido exitosamente');

      return {
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        expires_in: response.data.expires_in,
        scope: response.data.scope,
        jti: response.data.jti,
      };
    } catch (error) {
      Logger.error('[auth-service]: Error al obtener token de autenticación');

      if (error.response) {
        Logger.error(`[auth-service]: Status: ${error.response.status}`);
        Logger.error(`[auth-service]: Data: ${JSON.stringify(error.response.data)}`);

        // Errores específicos del servicio
        if (error.response.status === 400) {
          throw new Error('Credenciales inválidas para el servicio de Firma Electrónica');
        }

        if (error.response.status === 401) {
          throw new Error('No autorizado. Verifica las credenciales de autenticación');
        }
      }

      throw new Error(`Error al conectar con el servicio de autenticación: ${error.message}`);
    }
  },
};

module.exports = authService;
