const createAlumno = require('./create.handlers.alumno.adapters');
const findOneAlumno = require('./find-one.handlers.alumno.adapters');
const findOneAlumnoTitulo = require('./find-one.handlers.alumno-titulo.adapters');
const updateAlumno = require('./update.handlers.alumno.adapters');
const findGroupAlumnosPrograma = require('./find-group.handlers.alumnos-programa.adapters');
const deleteAlumno = require('./delete.handlers.alumno.adapters');
const alumnosInscripcion = require('./create-update.handlers.alumnos-inscripcion.adapters');
const findAlumnosInscritos = require('./find-group.handlers.alumnos-inscritos');
const validaciones = require('./validaciones');
const findAlumnosGrupo = require('./find-group.handlers.alumnos-grupo.adapters');
const deleteAlumnoInscrito = require('./delete.handlers.alumno-inscrito.adapters');
const findAlumnosCount = require('./find-all.handlers.alumno-count.adapters');
const findAlumnosExtra = require('./find-group.handlers.alumnos-extra.adapters');

module.exports = {
  createAlumno,
  findOneAlumno,
  findOneAlumnoTitulo,
  updateAlumno,
  findGroupAlumnosPrograma,
  deleteAlumno,
  alumnosInscripcion,
  findAlumnosInscritos,
  ...validaciones,
  findAlumnosGrupo,
  deleteAlumnoInscrito,
  findAlumnosCount,
  findAlumnosExtra,
};
