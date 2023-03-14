// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateDiligencia(request, reply) {
  try {
    const { diligenciaId } = request.params;
    const { ...changes } = request.body;

    Logger.info('[api/diligencia/update]: updating the diligence');
    const diligencias = await this.solicitudServices.updateDiligencia(
      { id: diligenciaId },
      changes,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligencias });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateDiligencia;
