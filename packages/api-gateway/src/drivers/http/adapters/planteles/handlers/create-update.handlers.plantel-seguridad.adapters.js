const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createUpdatePlantelSeguridad(req, reply) {
  try {
    const { plantelId } = req.params;
    const data = req.body;

    Logger.info('[api/seguridad/create]: creating link between plantel and seguridad');
    const plantelSeguridad = await this.institucionServices.createUpdatePlantelSeguridad(
      { plantelId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelSeguridad });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createUpdatePlantelSeguridad;
