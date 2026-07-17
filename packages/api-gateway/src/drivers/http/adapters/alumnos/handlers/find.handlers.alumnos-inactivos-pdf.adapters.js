const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAlumnosInactivosPdf(req, reply) {
  try {
    const { institucionId, plantelId, programaId } = req.query;
    Logger.info('[Alumno]: Generando reporte PDF de alumnos inactivos');
    const alumnos = await this.administracionAcademicaServices.findAllAlumnosInactivos({
      institucionId: Number(institucionId),
      plantelId: plantelId ? Number(plantelId) : undefined,
      programaId: programaId ? Number(programaId) : undefined,
    });
    const pdf = await this.filesServices.generarReporteAlumnosInactivos(alumnos);

    return reply
      .code(200)
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', 'attachment; filename="reporte-alumnos-inactivos.pdf"')
      .send(pdf);
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAlumnosInactivosPdf;
