const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupAlumnosPrograma(req, reply) {
  try {
    const { programaId } = req.params;
    const { matricula } = req.query;

    Logger.info(`[docente]: Getting Alumno by programa with id: ${programaId}`);
    const alumno = await this.administracionAcademicaServices.findGroupAlumnosPrograma({
      matricula,
      programaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroupAlumnosPrograma;
