const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createPlantelInfraestructura(req, reply) {
  try {
    const { plantelId } = req.params;
    const { ...data } = req.body;

    Logger.info('[api/higiene/create]: creating link between plantel and higiene');
    const plantelInfraestructura = await this.solicitudServices.createPlantelInfraestructura({
      plantelId,
    }, data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelInfraestructura });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createPlantelInfraestructura;
