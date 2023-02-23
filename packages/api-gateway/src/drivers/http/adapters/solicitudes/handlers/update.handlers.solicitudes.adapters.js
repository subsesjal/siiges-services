const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitud(req, reply) {
  try {
    const { solicitudId } = req.params;
    const { ...data } = req.body;

    Logger.info('[solicitudes]: Creating solicitud in solicitudes');
    const newSolicitud = await this.solicitudServices.updateSolicitud(
      { id: solicitudId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newSolicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolicitud;
