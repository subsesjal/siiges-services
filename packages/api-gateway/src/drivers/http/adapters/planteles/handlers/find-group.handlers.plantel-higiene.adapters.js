const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupPlantelHigiene(req, reply) {
  try {
    const { plantelId } = req.params;

    Logger.info(`[higiene]: Getting higiene by plantel with id: ${plantelId}`);
    const plantel = await this.institucionServices.findGroupPlantelHigiene({
      plantelId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupPlantelHigiene;
