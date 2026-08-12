const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function updatePrograma(request, reply) {
  try {
    const { programaId } = request.params;
    const { permisoAlumno } = request.body;

    Logger.info('[Programa]: update Programa');
    const programa = await this.administracionAcademicaServices
      .updatePrograma({ id: programaId }, { permisoAlumno });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: programa });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updatePrograma;
