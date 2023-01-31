const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updatePlantel(req, reply) {
  try {
    const { institucionId, plantelId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating plantel in institucion');
    const newPlantel = await this.institucionServices.updatePlantel(
      { institucionId, plantelId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newPlantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updatePlantel;
