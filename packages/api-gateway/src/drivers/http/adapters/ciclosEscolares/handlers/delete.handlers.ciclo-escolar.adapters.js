// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function deleteCicloEscolar(request, reply) {
  try {
    const { cicloEscolarId } = request.params;

    Logger.info(`[Ciclo escolar]: Eliminando ciclo escolar ${cicloEscolarId}`);
    const result = await this.administracionAcademicaServices
      .deleteCicloEscolar({ id: cicloEscolarId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: result });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deleteCicloEscolar };
