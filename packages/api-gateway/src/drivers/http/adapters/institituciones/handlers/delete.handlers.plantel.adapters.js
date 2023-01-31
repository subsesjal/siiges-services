const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deletePlantel(req, reply) {
  try {
    const { institucionId, plantelId } = req.params;

    Logger.info(`[instituciones]: Deleting plantel ${plantelId}`);

    const plantel = await this.institucionServices.deletePlantel({
      institucionId,
      plantelId,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deletePlantel;
