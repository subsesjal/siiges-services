const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createOrgColegiado(request, reply) {
  try {
    const { ...data } = request.body;

    Logger.info('[Ciclo escolar]: creating Ciclo Escolar');
    const orgColegiado = await this.administracionAcademicaServices.createCicloEscolar(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: cicloEscolar });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createOrgColegiado };
