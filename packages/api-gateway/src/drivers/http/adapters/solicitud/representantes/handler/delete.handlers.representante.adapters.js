const { Logger, checkers } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function deleteRepresentative(fastify, usuarioId) {
  Logger.info('[api/representative/delete]: Deleting representative');
  const representative = await fastify.solicitudServices.representative.deleteOne({ usuarioId });
  checkers.throwErrorIfDataIsFalsy(representative, 'deleting representative', { usuarioId });
  Logger.info('[api/representative/delete]: Representative deleted');

  return representative;
}

async function deleteOne(request, reply) {
  const { usuarioId = undefined } = request.params;
  const changes = { ...request.body };
  try {
    const representative = await deleteRepresentative(this, usuarioId, changes);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: representative });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteOne;
