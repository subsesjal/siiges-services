const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneVigilante(request, reply) {
  try {
    const { personaId } = request.params;

    Logger.info(`[api/vigilante]: find one vigilante by persona ${personaId}`);
    const vigilante = await this.vigilanciaServices.findOneVigilante({ personaId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: vigilante });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneVigilante };
