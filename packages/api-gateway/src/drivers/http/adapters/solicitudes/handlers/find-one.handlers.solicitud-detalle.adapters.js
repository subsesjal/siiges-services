const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudDetalle(req, reply) {
  try {
    const { solicitudId } = req.params;

    Logger.info('[solicitudes]: Getting solicitud');
    const solicitud = await this.solicitudServices.findOneSolicitudDetalle(
      { id: solicitudId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneSolicitudDetalle;
