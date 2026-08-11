const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findCatalogoCicloEscolar(request, reply) {
  try {
    const { all } = request.query;

    Logger.info('[Ciclo escolar]: find catalogo Ciclo Escolar');
    const ciclosEscolares = await this.administracionAcademicaServices
      .findCatalogoCicloEscolar(all === 'true');

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ciclosEscolares });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findCatalogoCicloEscolar };
