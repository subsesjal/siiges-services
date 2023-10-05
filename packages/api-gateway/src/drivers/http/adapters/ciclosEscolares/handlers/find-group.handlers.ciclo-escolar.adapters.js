// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findGroupCicloEscolar(request, reply) {
  try {
    const { programaId } = request.params;

    Logger.info('[Ciclo escolar]: find group Ciclo Escolar');
    const cicloEscolar = await this.administracionAcademicaServices
      .findGroupCicloEscolar({ programaId });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: cicloEscolar });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findGroupCicloEscolar };
