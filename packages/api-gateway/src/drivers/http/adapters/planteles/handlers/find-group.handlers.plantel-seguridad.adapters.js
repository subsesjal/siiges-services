const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupPlantelSeguridad(req, reply) {
  try {
    const { plantelId } = req.params;

    Logger.info(`[Seguridad]: Getting seguridad sistemas by plantel with id: ${plantelId}`);
    const plantelSeguridad = await this.institucionServices.findGroupPlantelSeguridad({
      plantelId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelSeguridad });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupPlantelSeguridad;
