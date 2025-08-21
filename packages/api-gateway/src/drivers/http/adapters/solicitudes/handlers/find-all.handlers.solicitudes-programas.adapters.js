const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllSolicitudesProgramas(req, reply) {
  try {
    const {
      usuarioId,
      estatusSolicitudId,
      limit,
      offset,
    } = req.query;

    Logger.info('[solicitudes]: Getting solicitudes list');
    const { solicitudes, filterOptions } = await this.solicitudServices
      .findAllSolicitudesProgramas({
        usuarioId, estatusSolicitudId, limit, offset,
      });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudes, filterOptions });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllSolicitudesProgramas;
