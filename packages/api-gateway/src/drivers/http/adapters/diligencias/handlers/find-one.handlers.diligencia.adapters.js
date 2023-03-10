// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findOneDiligencia(request, reply) {
  try {
    const { diligenciaId } = request.params;

    Logger.info('[api/diligencia/findOne]: finding the diligence');
    const diligencia = await this.solicitudServices.findOneDiligencia(
      { id: diligenciaId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneDiligencia;
