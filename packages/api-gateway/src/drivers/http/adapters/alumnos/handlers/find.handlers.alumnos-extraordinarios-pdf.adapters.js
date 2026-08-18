const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosExtraordinariosPdf(req, reply) {
  try {
    const {
      institucionId, plantelId, programaId, cicloEscolarId,
    } = req.query;
    Logger.info('[Alumno]: Generando reporte PDF de alumnos extraordinarios');
    const calificaciones = await this
      .administracionAcademicaServices
      .findAllAlumnosExtraordinarios({
        institucionId: Number(institucionId),
        plantelId: plantelId ? Number(plantelId) : undefined,
        programaId: programaId ? Number(programaId) : undefined,
        cicloEscolarId: Number(cicloEscolarId),
      });
    const pdf = await this.filesServices.generarReporteAlumnosExtraordinariosPdf(calificaciones);

    return reply
      .code(200)
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', 'attachment; filename="reporte-alumnos-extraordinarios.pdf"')
      .send(pdf);
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosExtraordinariosPdf;
