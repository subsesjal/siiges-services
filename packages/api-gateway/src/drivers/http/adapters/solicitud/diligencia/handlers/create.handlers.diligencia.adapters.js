const { Logger, checkers } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createDiligence(fastify, request) {
  const { ...data } = request.body;

  Logger.info('[api/diligencia/create]: finding the diligence');
  const diligence = await fastify.solicitudServices.diligence.create(data);
  checkers.throwErrorIfDataIsFalsy(diligence);
  Logger.info('[api/diligencia/findOne]: the diligence was found');

  return diligence;
}

async function create(request, reply) {
  try {
    const diligence = await createDiligence(this, request);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligence });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = create;
