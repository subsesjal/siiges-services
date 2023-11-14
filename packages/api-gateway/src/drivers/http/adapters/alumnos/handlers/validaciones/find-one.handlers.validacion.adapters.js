const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findOneAlumnoValidacion(req, reply) {
  try {
    const { alumnoId } = req.params;

    Logger.info('[Alumno]: Validacion Alumno');

    const alumnoValidacion = await this.administracionAcademicaServices.findOneAlumnoValidacion({
      alumnoId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: alumnoValidacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneAlumnoValidacion };
