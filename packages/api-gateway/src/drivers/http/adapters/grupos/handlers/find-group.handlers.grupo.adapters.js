// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findGroupGrupo(request, reply) {
  try {
    const { cicloEscolarId, gradoId } = request.params;

    Logger.info('[Grupo]: find group Grupo');
    const Grupo = await this.administracionAcademicaServices.findGroupGrupo(
      { cicloEscolarId, gradoId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: Grupo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findGroupGrupo };
