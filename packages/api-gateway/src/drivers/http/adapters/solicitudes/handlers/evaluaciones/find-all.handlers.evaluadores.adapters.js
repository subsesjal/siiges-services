const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findAllEvaluadores(req, reply) {
  try {
    Logger.info('[Evaluador]: List evaluadores');

    const evaluadores = await this.solicitudServices.findAllEvaluadores();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: evaluadores });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllEvaluadores };
