const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createDirectorPlantel(req, reply) {
  try {
    const { plantelId } = req.params;
    const { ...data } = req.body;

    Logger.info('[planteles]: Creating director in plantel');

    const opts = [
      { association: 'persona' },
    ];

    const newPlantel = await this.institucionServices.createDirectorPlantel(
      plantelId,
      data,
      opts,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newPlantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createDirectorPlantel;
