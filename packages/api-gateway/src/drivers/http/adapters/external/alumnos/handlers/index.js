const { create } = require('./create.handlers.alumno.adapters');
const { inscripcion } = require('./inscripcion.handlers.alumnos.adapters');
const { calificaciones } = require('./create.handlers.calificaciones.adapter');

module.exports = {
  create,
  inscripcion,
  calificaciones,
};
