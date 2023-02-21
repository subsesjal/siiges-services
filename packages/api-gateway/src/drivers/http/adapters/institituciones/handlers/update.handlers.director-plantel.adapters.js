const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateDirectorPlantel(req, reply) {
  try {
    const { plantelId, directorId } = req.params;
    const { ...data } = req.body;

    Logger.info('[planteles]: Updating director in plantel');
    const director = await this.institucionServices.updateDirectorPlantel(
      { plantelId, directorId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: director });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateDirectorPlantel;
