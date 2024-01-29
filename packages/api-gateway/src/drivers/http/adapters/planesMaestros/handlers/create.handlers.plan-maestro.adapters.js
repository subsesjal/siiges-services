const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createPlanMaestro(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[Planes Maestros]: creating Planes Maestros');
    const planMaestro = await this.opdServices.createPlanMaestro(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: planMaestro });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createPlanMaestro };
