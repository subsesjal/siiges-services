const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createAlumno(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[Alumno]: Creating Alumno');

    const newAlumno = await this.administracionAcademicaServices.createAlumno(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newAlumno });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createAlumno;
