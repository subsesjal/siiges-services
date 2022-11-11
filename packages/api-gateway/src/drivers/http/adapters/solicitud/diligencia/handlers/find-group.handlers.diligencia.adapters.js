// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../../utils/errorHandler');

async function findDiligencesRelatedToSolicitud(fastify, data) {
  Logger.info(`[api/diligencia/findOne]: finding diligences related to solicitud with id ${data.solicitudId}`);
  const diligencesList = await fastify.solicitudServices.diligence.findGroup(
    { query: { solicitudId: data.solicitudId } },
  );
  checkers.throwErrorIfDataIsFalsy(diligencesList, 'finding diligences', { id: data.solicitudId });
  Logger.info('[api/diligencia/findOne]: the diligence was found');

  return diligencesList;
}

async function findGroup(request, reply) {
  const { ...data } = request.params;
  try {
    const diligencesList = await findDiligencesRelatedToSolicitud(this, data);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligencesList });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroup;
