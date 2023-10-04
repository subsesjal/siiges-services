const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findCumplimiento(req, reply) {
  try {
    const queryParams = req.query;

    Logger.info('[Evaluaciones]: getting cumplimiento');
    const cumplimiento = await this.solicitudServices.findCumplimiento(queryParams);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: cumplimiento });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findCumplimiento };
