const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateAlumno(req, reply) {
  try {
    const { ...data } = req.body;
    const { alumnoId } = req.params;

    Logger.info('[Alumnos]: Updating alumno');

    const alumnoUpdated = await this.administracionAcademicaServices.updateAlumno(
      { id: alumnoId },
      data,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnoUpdated });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateAlumno;
