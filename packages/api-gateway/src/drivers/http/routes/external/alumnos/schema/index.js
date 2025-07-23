const { createAlumno } = require('./create.alumno.schema');
const { inscripcionSchema } = require('./inscripcion.alumnos.schema');
const { calificacionesSchema } = require('./create.calificaciones.schema');

module.exports = {
  createAlumno,
  inscripcionSchema,
  calificacionesSchema,
};
