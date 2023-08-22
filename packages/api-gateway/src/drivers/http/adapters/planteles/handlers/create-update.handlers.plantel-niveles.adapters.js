const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createPlantelNiveles(req, reply) {
  try {
    const { plantelId } = req.params;
    const data = req.body;

    Logger.info('[api/plantel-niveles/create]: creating link between plantel and edificios-niveles');
    const plantelEdificiosNiveles = await this.institucionServices.createUpdatePlantelNiveles({
      plantelId,
    }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelEdificiosNiveles });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createPlantelNiveles;
