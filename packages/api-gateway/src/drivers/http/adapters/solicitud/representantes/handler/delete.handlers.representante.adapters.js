const { Logger, checkers } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function deleteRepresentative(fastify, { usuarioId, solicitudId }) {
  Logger.info('[api/representative/delete]: Deleting representative');
  const representative = await fastify.solicitudServices.representative.deleteOne(
    { usuarioId, solicitudId },
  );
  checkers.throwErrorIfDataIsFalsy(representative, 'deleting representative', { usuarioId });
  Logger.info('[api/representative/delete]: Representative deleted');

  return representative;
}

async function deleteOne(request, reply) {
  try {
    const representative = await deleteRepresentative(this, request.params);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: representative });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteOne;
