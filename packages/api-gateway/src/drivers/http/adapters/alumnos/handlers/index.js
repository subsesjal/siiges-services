const createAlumno = require('./create.handlers.alumno.adapters');
const findOneAlumno = require('./find-one.handlers.alumno.adapters');
const updateAlumno = require('./update.handlers.alumno.adapters');
const findGroupAlumnosPrograma = require('./find-group.handlers.alumnos-programa.adapters');
const deleteAlumno = require('./delete.handlers.alumno.adapters');
const alumnosInscripcion = require('./handlers.alumnos-inscripcion.adapters');

module.exports = {
  createAlumno,
  findOneAlumno,
  updateAlumno,
  findGroupAlumnosPrograma,
  deleteAlumno,
  alumnosInscripcion,
};
