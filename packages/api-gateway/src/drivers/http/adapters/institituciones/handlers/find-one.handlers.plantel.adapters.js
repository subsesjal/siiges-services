const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOnePlantel(req, reply) {
  try {
    const { institucionId, plantelId } = req.params;

    Logger.info(`[instituciones]: Getting plantel ${plantelId}`);

    const plantel = await this.institucionServices.findOnePlantel({
      institucionId,
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

module.exports = findOnePlantel;
