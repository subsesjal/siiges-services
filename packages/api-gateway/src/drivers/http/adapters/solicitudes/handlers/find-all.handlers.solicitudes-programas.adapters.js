const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudesProgramas(req, reply) {
  try {
    const { usuarioId, estatusSolicitudId } = req.query;

    Logger.info('[solicitudes]: Getting solicitudes list');
    const solicitudes = await this.solicitudServices.findAllSolicitudesProgramas({
      usuarioId, estatusSolicitudId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllSolicitudesProgramas;
