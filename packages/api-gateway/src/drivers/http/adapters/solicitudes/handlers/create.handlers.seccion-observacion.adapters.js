const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createSendMailObservacion(req, reply) {
  try {
    const { solicitudId } = req.params;

    Logger.info('[solicitudes]: Updating observacion');

    const { findAllSolicitudes, mailOptions } = await this
      .solicitudServices.createSendMailObservacion(
        {
          solicitudId,
        },
      );

    const { usuarioId, email, params } = mailOptions;

    this.notificacionServices.sendNotificationEmail({
      usuarioId,
      email,
      asunto: `ATENDER OBSERVACIONES - SOLICITUD #${params.folio}`,
      template: 'observacionSolicitud',
      params,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: findAllSolicitudes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSendMailObservacion };
