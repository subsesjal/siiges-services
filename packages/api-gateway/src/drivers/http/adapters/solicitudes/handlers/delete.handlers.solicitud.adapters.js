const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteSolicitud(req, reply) {
  try {
    const { solicitudId } = req.params;
    Logger.info(`[Solicitud]: Deleting solicitud with id: ${solicitudId}`);
    const solicitud = await this.solicitudServices.deleteSolicitud({
      id: solicitudId,
    });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteSolicitud;
