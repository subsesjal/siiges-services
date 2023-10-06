// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function deleteGrupo(request, reply) {
  try {
    const { grupoId } = request.params;

    Logger.info('[Grupo]: deleted Grupo');

    const Grupo = await this.administracionAcademicaServices.deleteGrupo(
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

module.exports = { deleteGrupo };
