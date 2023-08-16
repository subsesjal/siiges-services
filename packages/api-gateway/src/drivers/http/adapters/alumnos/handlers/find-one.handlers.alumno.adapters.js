const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneAlumno(req, reply) {
  try {
    const { alumnoId } = req.params;

    Logger.info(`[Alumno]: Getting Alumno with id: ${alumnoId}`);
    const alumno = await this.administracionAcademicaServices.findOneAlumno({
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

module.exports = findOneAlumno;
