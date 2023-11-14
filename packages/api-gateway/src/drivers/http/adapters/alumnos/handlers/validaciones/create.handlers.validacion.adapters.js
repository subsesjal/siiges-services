const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createAlumnoValidacion(req, reply) {
  try {
    const data = req.body;
    const { alumnoId } = req.params;

    Logger.info('[Alumno]: Validacion Alumno');

    const alumnoValidacion = await this.administracionAcademicaServices.createAlumnoValidacion({
      alumnoId,
      ...data,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnoValidacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createAlumnoValidacion };
