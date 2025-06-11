const { create } = require('./create.handlers.alumno.adapters');
const { inscripcion } = require('./inscripcion.handlers.alumnos.adapters');

module.exports = {
  create,
  inscripcion,
};
