const { Logger, checkers } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createRepresentative(fastify, data) {
  const { usuarioId, solicitudId } = data;
  Logger.info('[api/representative/create]: Creating representative');
  const representative = await fastify.solicitudServices.representative.createWithCheck(
    { usuarioId, solicitudId },
    data,
  );
  checkers.throwErrorIfDataIsFalsy(representative, 'Creating representative');
  Logger.info('[api/representative/create]: Representative created');

  return representative;
}

async function create(request, reply) {
  const data = { ...request.body };
  try {
    const representative = await createRepresentative(this, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: representative });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = create;
