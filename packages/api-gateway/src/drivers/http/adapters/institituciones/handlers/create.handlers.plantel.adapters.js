const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createPlantel(req, reply) {
  try {
    const { institucionId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating plantel in institucion');

    const opts = [
      { association: 'domicilio' },
    ];

    const newPlantel = await this.institucionServices.createPlantel(
      institucionId,
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

module.exports = createPlantel;
