const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosInactivosCsv(req, reply) {
  try {
    const { institucionId, plantelId, programaId } = req.query;
    Logger.info('[Alumno]: Generando reporte CSV de alumnos inactivos');
    const alumnos = await this.administracionAcademicaServices.findAllAlumnosInactivos({
      institucionId: Number(institucionId),
      plantelId: plantelId ? Number(plantelId) : undefined,
      programaId: programaId ? Number(programaId) : undefined,
    });
    const csv = await this.filesServices.generarReporteAlumnosInactivosCsv(alumnos);

    return reply
      .code(200)
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', 'attachment; filename="reporte-alumnos-inactivos.csv"')
      .send(csv);
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosInactivosCsv;
