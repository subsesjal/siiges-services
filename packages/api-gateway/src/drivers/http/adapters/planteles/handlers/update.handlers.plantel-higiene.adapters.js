const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updatePlantelHigiene(req, reply) {
  try {
    const { plantelId, higieneId } = req.params;
    const { cantidad } = req.body;

    Logger.info('[api/higiene/update]: updating link between plantel and higiene');
    const plantelHigiene = await this.institucionServices.updatePlantelHigiene({
      plantelId,
      higieneId,
      cantidad,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelHigiene });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updatePlantelHigiene;
