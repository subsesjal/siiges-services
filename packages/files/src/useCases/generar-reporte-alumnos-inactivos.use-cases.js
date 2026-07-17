const { Logger } = require('@siiges-services/shared');

const generarReporteAlumnosInactivos = (GenerarReporteAlumnosInactivos) => async (alumnos) => {
  Logger.info('[files.generarReporteAlumnosInactivos.use-case]: Generando reporte de alumnos inactivos');
  const file = await GenerarReporteAlumnosInactivos(alumnos);
  return Buffer.from(file);
};

module.exports = generarReporteAlumnosInactivos;
