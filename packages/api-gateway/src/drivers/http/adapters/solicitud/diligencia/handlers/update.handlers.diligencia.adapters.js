// External dependencies
const { badRequest } = require('@hapi/boom');
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../../utils/errorHandler');

async function updateDiligence(fastify, identifier, changes) {
  if (checkers.isFalsy(identifier)) {
    throw badRequest('[api/diligencia/update]: to update a diligencia we need a diligenceId');
  }

  Logger.info('[api/diligencia/update]: updating the diligence');
  const diligence = await fastify.solicitudServices.diligence.update(
    { id: identifier },
    changes,
  );
  checkers.throwErrorIfDataIsFalsy(diligence);
  Logger.info('[api/diligencia/findOne]: the diligence was updated');

  return diligence;
}

async function update(request, reply) {
  const { diligenceId } = request.params;
  const { ...changes } = request.body;

  try {
    const diligence = await updateDiligence(this, diligenceId, changes);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligence });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = update;
