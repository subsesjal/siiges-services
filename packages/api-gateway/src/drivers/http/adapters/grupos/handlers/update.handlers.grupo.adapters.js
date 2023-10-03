// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateGrupo(request, reply) {
  try {
    const { grupoId } = request.params;

    Logger.info('[Grupo]: update Grupo');

    const Grupo = await this.administracionAcademicaServices.updateGrupo(
      { id: grupoId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: Grupo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateGrupo };
