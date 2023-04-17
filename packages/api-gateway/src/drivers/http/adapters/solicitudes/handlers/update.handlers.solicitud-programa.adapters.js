const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes services
async function updateSolicitudPrograma(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudId } = req.params;

    Logger.info('[solicitudes]: Updating solicitud');

    const solicitud = await this.solicitudServices.updateSolicitudPrograma(
      { id: solicitudId },
      data,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolicitudPrograma;
