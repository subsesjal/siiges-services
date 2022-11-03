// External dependencies
const { badRequest } = require('@hapi/boom');
const { Logger, checkers } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findRepresentative(fastify, { usuarioId, solicitudId }) {
  if (checkers.isFalsy(usuarioId)
  || checkers.isFalsy(solicitudId)) {
    throw badRequest('[api/representante/findOne]: to find a representative we need a solicitudId and usuarioId');
  }

  Logger.info('[api/representative/findOne]: finding the representative ');
  const representative = await fastify.solicitudServices.representative.findOne(
    { usuarioId, solicitudId },
  );
  checkers.throwErrorIfDataIsFalsy(representative, 'finding representante', 'usuarioId');
  Logger.info('[api/representative/findOne]: the representative was found');

  return representative.dataValues;
}

async function findOne(request, reply) {
  try {
    const representative = await findRepresentative(this, request.params);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: { ...representative } });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOne;
