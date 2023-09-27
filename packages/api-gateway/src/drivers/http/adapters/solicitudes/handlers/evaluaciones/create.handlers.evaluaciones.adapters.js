const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createEvaluaciones(req, reply) {
  try {
    const { body: data } = req;

    Logger.info('[Evaluaciones]: creating evaluations');
    const evaluacion = await this.solicitudServices.createEvaluaciones(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: evaluacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createEvaluaciones };
