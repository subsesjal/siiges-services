const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createDiligencia(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[api/diligencia/create]: creating the diligencia');
    const diligencia = await this.solicitudServices.createDiligencia(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: diligencia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createDiligencia;
