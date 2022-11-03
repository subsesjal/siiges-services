// External dependencies
const { badRequest } = require('@hapi/boom');
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../../utils/errorHandler');

async function deleteDiligence(fastify, identifier) {
  if (checkers.isFalsy(identifier)) {
    throw badRequest('[api/diligencia/delete]: to delete a diligencia we need its id');
  }

  Logger.info('[api/diligencia/delete]: deleiting the diligence');
  const diligence = await fastify.solicitudServices.diligence.deleteOne(
    { id: identifier },
  );
  checkers.throwErrorIfDataIsFalsy(diligence);
  Logger.info('[api/diligencia/delete]: the diligence was deleted');

  return diligence;
}

async function deleteOne(request, reply) {
  const { diligenceId } = request.params;

  try {
    const diligence = await deleteDiligence(this, diligenceId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligence });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteOne;
