const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createOrgColegiado(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[Organos colegiados]: creating Organo Colegiado');
    const orgColegiado = await this.opdServices.createOrgColegiado(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: orgColegiado });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createOrgColegiado };
