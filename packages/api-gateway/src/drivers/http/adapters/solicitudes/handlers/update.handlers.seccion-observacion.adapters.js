const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolcitudSeccionObservacion(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudId, seccionId } = req.params;

    Logger.info('[solicitudes]: Updating observacion');

    const solicitud = await this.solicitudServices.updateSolcitudSeccionObservacion(
      { ...data, seccionId, solicitudId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolcitudSeccionObservacion;
