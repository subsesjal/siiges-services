// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findDiligencias(fastify, data) {
  Logger.info('[api/diligencia/findOne]: finding the diligence');
  const diligencias = await fastify.solicitudServices.diligencias.findOne(
    { id: data.diligenceId },
  );
  checkers.throwErrorIfDataIsFalsy(diligencias);
  Logger.info('[api/diligencia/findOne]: the diligence was found');

  return diligencias;
}

async function findOneDiligencia(request, reply) {
  const { ...data } = request.params;
  try {
    const diligencias = await findDiligencias(this, data);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligencias });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneDiligencia;
