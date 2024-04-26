const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupPlantelInfraestructura(req, reply) {
  try {
    const { plantelId, programaId } = req.params;

    Logger.info(`[infraestructura]: Getting infraestructura by plantel with id: ${plantelId}`);
    const plantel = await this.solicitudServices.findGroupPlantelInfraestructura({
      plantelId,
      programaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupPlantelInfraestructura;
