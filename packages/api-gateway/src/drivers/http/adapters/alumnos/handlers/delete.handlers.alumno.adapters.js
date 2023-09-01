const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteAlumno(req, reply) {
  try {
    const { alumnoId } = req.params;

    Logger.info(`[Alumno]: Deleting Alumno with id: ${alumnoId}`);
    const alumno = await this.administracionAcademicaServices.deleteAlumno({
      id: alumnoId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteAlumno;
