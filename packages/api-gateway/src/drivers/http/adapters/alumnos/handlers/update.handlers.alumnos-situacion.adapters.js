const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateAlumnosSituacion(req, reply) {
  try {
    const { alumnoIds } = req.body;

    Logger.info(`[Alumnos]: Activación masiva de ${alumnoIds.length} alumnos`);

    const resultado = await this.administracionAcademicaServices.updateAlumnosSituacion({
      alumnoIds,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: resultado });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateAlumnosSituacion;
