const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function updateEvaluaciones(req, reply) {
  try {
    const { evaluacionId } = req.params;
    const { body: data } = req;

    Logger.info('[Evaluaciones]: creating evaluations');
    const evaluacionUpdate = await this.institucionServices.updateEvaluaciones({
      evaluacionId,
      data,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: evaluacionUpdate });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateEvaluaciones };
