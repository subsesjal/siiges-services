const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createAcuerdo(request, reply) {
  try {
    const { organoColegiadoId } = request.params;
    const { ...data } = request.body;

    Logger.info('[Acuerdos]: creating Acuerdo');
    const acuerdo = await this.opdServices.createAcuerdo(
      { organoColegiadoId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: acuerdo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createAcuerdo };
