const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosGrupo(req, reply) {
  try {
    const { grupoId, asignaturaId } = req.params;

    Logger.info('[Alumno]: find Alumnos por grupo y asignatura');

    const almnosGrupo = await this.administracionAcademicaServices.findAlumnosGrupoAsignatura({
      grupoId,
      asignaturaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: almnosGrupo });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosGrupo;
