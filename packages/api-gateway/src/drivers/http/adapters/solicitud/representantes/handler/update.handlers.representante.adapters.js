const { Logger, checkers } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findRepresentative(fastify, { usuarioId, solicitudId }, changes) {
  Logger.info('[api/representative/update]: Updating representative');
  const representative = await fastify.solicitudServices.representative.updateAndFind(
    { usuarioId, solicitudId },
    changes,
  );
  checkers.throwErrorIfDataIsFalsy(representative, 'updating representative', { usuarioId });
  Logger.info('[api/representative/update]: Representative updated');

  return representative;
}

async function update(request, reply) {
  try {
    const representative = await findRepresentative(this, request.params, request.body);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: representative });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = update;
