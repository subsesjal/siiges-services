const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createCatalogoCicloEscolar(request, reply) {
  try {
    Logger.info('[Ciclo escolar]: create catalogo Ciclo Escolar');
    const cicloEscolar = await this.administracionAcademicaServices
      .createCatalogoCicloEscolar(request.body);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: cicloEscolar });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createCatalogoCicloEscolar };
