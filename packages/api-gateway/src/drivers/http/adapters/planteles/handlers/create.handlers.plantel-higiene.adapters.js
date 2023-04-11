const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createPlantelHigiene(req, reply) {
  try {
    const { plantelId, higieneId } = req.params;
    const { cantidad } = req.body;

    Logger.info('[api/higiene/create]: creating the higiene');
    const higienePlantel = await this.institucionServices.createHigiene({
      plantelId,
      higieneId,
      cantidad,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: higienePlantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createPlantelHigiene;
