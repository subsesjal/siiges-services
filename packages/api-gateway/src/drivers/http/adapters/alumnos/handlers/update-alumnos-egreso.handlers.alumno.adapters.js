const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateAlumnosEgreso(req, reply) {
  try {
    const { alumnoIds } = req.body;

    Logger.info(`[Alumnos]: Egreso masivo de ${alumnoIds.length} alumnos`);

    const resultado = await this.administracionAcademicaServices.updateAlumnosEgreso({
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

module.exports = updateAlumnosEgreso;
