const { Logger } = require('@siiges-services/shared');

const firmaCertificado = (
  findOneTokenExternoQuery,
  createTokenExternoQuery,
  updateTokenExternoQuery,
  createDocumentoFirmadoQuery,
  authService,
  firmaService,
) => async (data) => {
  const {
    solicitudFolioId,
    pkcs7,
    claveDocumento,
    tipoServicio,
  } = data;

  Logger.info('[firma-certificado]: Iniciando proceso de firma electrónica');

  try {
    // ==========================================
    // PASO 1: VALIDAR O OBTENER TOKEN
    // ==========================================
    Logger.info('[firma-certificado]: Validando token existente');

    let token = await findOneTokenExternoQuery({
      servicio: 'firma_certificado',
      activo: true,
    });

    // Verificar si el token existe y no está expirado
    const now = new Date();
    const isTokenValid = token && new Date(token.fechaExpiracion) > now;

    if (!isTokenValid) {
      if (token) {
        Logger.info('[firma-certificado]: Token expirado, desactivando token anterior');
        // Desactivar el token anterior
        await updateTokenExternoQuery(token.id, { activo: false });
      } else {
        Logger.info('[firma-certificado]: No existe token previo');
      }

      // Obtener nuevo token del servicio externo
      Logger.info('[firma-certificado]: Obteniendo nuevo token de autenticación');
      const authResponse = await authService.obtenerToken();

      if (!authResponse || !authResponse.access_token) {
        throw new Error('No se pudo obtener el token de autenticación del servicio externo');
      }

      Logger.info('[firma-certificado]: Token obtenido exitosamente');

      // Guardar el nuevo token en la base de datos
      const tokenData = {
        servicio: 'firma_certificado',
        accessToken: authResponse.access_token,
        tokenType: authResponse.token_type || 'bearer',
        expiresIn: parseInt(authResponse.expires_in, 10),
        fechaObtencion: new Date(),
      };

      token = await createTokenExternoQuery(tokenData);
      Logger.info('[firma-certificado]: Nuevo token almacenado en base de datos');
    } else {
      Logger.info('[firma-certificado]: Token válido encontrado, reutilizando');
    }

    // ==========================================
    // PASO 2: FIRMAR DOCUMENTO
    // ==========================================
    Logger.info('[firma-certificado]: Enviando documento a firmar');

    const firmaPayload = {
      pkcs7,
      clavedocumento: claveDocumento,
      tiposervicio: tipoServicio || 'Solicitud de Folios Digitales',
    };

    const firmaResponse = await firmaService.firmarDocumento(
      firmaPayload,
      token.accessToken,
    );

    if (!firmaResponse || !firmaResponse.foliovalidacion) {
      throw new Error('La respuesta del servicio de firma no contiene el folio de validación');
    }

    Logger.info(`[firma-certificado]: Documento firmado exitosamente. Folio: ${firmaResponse.foliovalidacion}`);

    // ==========================================
    // PASO 3: PERSISTIR RESULTADO
    // ==========================================
    Logger.info('[firma-certificado]: Guardando resultado en base de datos');

    const documentoData = {
      solicitudFolioId,
      folioValidacion: firmaResponse.foliovalidacion,
      hashObjetoFirmado: firmaResponse.hashobjetofirmado,
      idDocumento: firmaResponse.iddocumento,
      datosFirmante: firmaResponse.datosfirmante,
      objetoFirmado: firmaResponse.objetofirmado,
      firmaResponse: firmaResponse.firmaresponse,
      uriValidacion: firmaResponse.urivalidacion,
      tipoDocumento: firmaResponse.tipodocumento,
      claveDocumento,
      tipoServicio: tipoServicio || 'Solicitud de Folios Digitales',
      estatusFirmado: 'exitoso',
    };

    const documentoFirmado = await createDocumentoFirmadoQuery(documentoData);

    Logger.info(`[firma-certificado]: Proceso completado. Documento ID: ${documentoFirmado.id}`);

    // ==========================================
    // PASO 4: RETORNAR RESPUESTA
    // ==========================================
    return {
      id: documentoFirmado.id,
      solicitudFolioId: documentoFirmado.solicitudFolioId,
      folioValidacion: documentoFirmado.folioValidacion,
      hashObjetoFirmado: documentoFirmado.hashObjetoFirmado,
      idDocumento: documentoFirmado.idDocumento,
      datosFirmante: documentoFirmado.datosFirmante,
      objetoFirmado: documentoFirmado.objetoFirmado,
      firmaResponse: documentoFirmado.firmaResponse,
      uriValidacion: documentoFirmado.uriValidacion,
      tipoDocumento: documentoFirmado.tipoDocumento,
      estatusFirmado: documentoFirmado.estatusFirmado,
      fechaFirmado: documentoFirmado.fechaFirmado,
    };
  } catch (error) {
    Logger.error('[firma-certificado]: Error en el proceso de firma');
    Logger.error(error);

    // Si el error es por token inválido, intentar desactivar el token actual
    if (error.response && error.response.status === 401) {
      Logger.error('[firma-certificado]: Token inválido, desactivando');
      if (token && token.id) {
        await updateTokenExternoQuery(token.id, { activo: false });
      }
    }

    throw error;
  }
};

module.exports = firmaCertificado;
