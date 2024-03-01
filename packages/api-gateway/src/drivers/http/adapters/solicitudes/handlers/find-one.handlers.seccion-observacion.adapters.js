const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolcitudSeccionObservacion(req, reply) {
  try {
    const { solicitudId, seccionId } = req.params;

    Logger.info('[solicitudes]: Updating observacion');

    const seccionObservaciones = await this
      .solicitudServices.findOneSolcitudSeccionObservacion(
        { seccionId, solicitudId },
      );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: seccionObservaciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneSolcitudSeccionObservacion };
