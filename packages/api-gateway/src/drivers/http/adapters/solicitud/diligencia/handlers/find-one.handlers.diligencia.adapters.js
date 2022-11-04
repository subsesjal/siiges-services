// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../../utils/errorHandler');

async function findDiligence(fastify, data) {
  Logger.info('[api/diligencia/findOne]: finding the diligence');
  const diligence = await fastify.solicitudServices.diligence.findOne(
    { id: data.diligenceId },
  );
  checkers.throwErrorIfDataIsFalsy(diligence);
  Logger.info('[api/diligencia/findOne]: the diligence was found');

  return diligence;
}

async function findOne(request, reply) {
  const { ...data } = request.params;
  try {
    const diligence = await findDiligence(this, data);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligence });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOne;
