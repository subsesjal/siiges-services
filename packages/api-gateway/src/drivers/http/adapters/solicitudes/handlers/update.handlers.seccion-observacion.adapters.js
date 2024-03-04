const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolcitudSeccionObservacion(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudId, seccionId } = req.params;

    Logger.info('[solicitudes]: Updating observacion');

    const { statusCode, newSeccionObservaciones } = await this
      .solicitudServices.updateSolcitudSeccionObservacion(
        { ...data, seccionId, solicitudId },
      );

    return reply
      .code(statusCode)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newSeccionObservaciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolcitudSeccionObservacion;
