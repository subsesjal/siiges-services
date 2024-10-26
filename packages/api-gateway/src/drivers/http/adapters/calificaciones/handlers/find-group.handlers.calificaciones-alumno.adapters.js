const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findCalificacionesAlumno(req, reply) {
  try {
    const { alumnoId } = req.params;

    Logger.info('[Calificaciones]: find Calificaciones by Alumno');

    const calificacionesAlumno = await this.administracionAcademicaServices
      .findCalificacionesAlumno({
        alumnoId,
      });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: calificacionesAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findCalificacionesAlumno;
