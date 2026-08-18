const { Logger } = require('@siiges-services/shared');

const generarReporteAlumnosExtraordinarios = (
  GenerarReporteAlumnosExtraordinarios,
) => async (calificaciones) => {
  Logger.info(
    '[files.generarReporteAlumnosExtraordinarios.use-case]: '
    + 'Generando reporte de alumnos extraordinarios',
  );
  const file = await GenerarReporteAlumnosExtraordinarios(calificaciones);
  return Buffer.from(file);
};

module.exports = generarReporteAlumnosExtraordinarios;
