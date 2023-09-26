const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findOneEvaluaciones(req, reply) {
  try {
    const { evaluacionId: id } = req.params;

    Logger.info('[Evaluaciones]: creating evaluations');
    const evaluacion = await this.solicitudServices.findOneEvaluaciones({
      id,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: evaluacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneEvaluaciones };
