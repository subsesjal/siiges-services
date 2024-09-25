const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteAlumnoInscrito(req, reply) {
  try {
    const { alumnoId, grupoId } = req.params;

    Logger.info(`[Alumno]: Eliminar inscripción del alumno con ID ${alumnoId} del grupo ${grupoId}`);

    const result = await this.administracionAcademicaServices.deleteAlumnoInscripcion(
      { grupoId },
      { alumnoId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(result);
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteAlumnoInscrito;
