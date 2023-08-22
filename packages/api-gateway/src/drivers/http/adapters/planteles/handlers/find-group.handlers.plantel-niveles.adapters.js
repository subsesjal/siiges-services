const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupPlantelNiveles(req, reply) {
  try {
    const { plantelId } = req.params;

    Logger.info(`[niveles]: Getting niveles by plantel with id: ${plantelId}`);
    const plantelNiveles = await this.institucionServices.findGroupPlantelNiveles({
      plantelId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelNiveles });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupPlantelNiveles;
