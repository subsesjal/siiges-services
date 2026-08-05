const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateCatalogoCicloEscolar(request, reply) {
  try {
    const { id } = request.params;
    const { body } = request;

    Logger.info('[Ciclo escolar]: update catalogo Ciclo Escolar');
    const cicloEscolar = await this.administracionAcademicaServices
      .updateCatalogoCicloEscolar(id, body);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: cicloEscolar });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateCatalogoCicloEscolar };
