const {
  alumnos, programas, grupos, validaciones,
} = require('../../../adapters/db');

const createAlumno = require('./create.alumno.use-cases');
const findOneAlumno = require('./find-one.alumno.use-cases');
const findOneAlumnoTitulo = require('./find-one.alumno-titulo.use-cases');
const updateAlumno = require('./update.alumno.use-cases');
const findGroupAlumnosPrograma = require('./find-group.alumnos-programa.use-cases');
const deleteAlumno = require('./delete.alumno.use-cases');
const alumnosInscripcion = require('./alumnos-inscripcion.use-cases');
const deleteAlumnoInscrito = require('./delete.alumno-inscrito.use-cases');
const { findAlumnosInscritos } = require('./find-group.alumnos-inscritos.use-cases');
const findAlumnosGrupoAsignatura = require('./find-group.alumnos-grupo.use-cases');
const updateCalificaciones = require('./update.calificaciones.use-cases');
const findCalificacionesAlumno = require('./find-group.calificaciones-alumno.use-cases');
const findAllAlumnosCount = require('./find-all.alumno-count.use-cases');
const findAlumnosExtra = require('./find-group.alumnos-extra.use-cases');

module.exports = {
  createAlumno: createAlumno(
    alumnos.findOneAlumnoQuery,
    programas.findOneProgramaQuery,
    alumnos.createAlumnoQuery,
    alumnos.createAlumnoTipoTramiteQuery,
  ),
  findOneAlumno: findOneAlumno(
    alumnos.findOneAlumnoQuery,
  ),
  findOneAlumnoTitulo: findOneAlumnoTitulo(
    alumnos.findOneAlumnoTituloQuery,
  ),
  updateAlumno: updateAlumno(
    alumnos.findOneAlumnoQuery,
    alumnos.findOneAlumnoTipoTramiteQuery,
    alumnos.createAlumnoTipoTramiteQuery,
    alumnos.updateAlumnoQuery,
    alumnos.updateAlumnoTipoTramiteQuery,
    alumnos.updatePersonaQuery,
  ),
  findGroupAlumnosPrograma: findGroupAlumnosPrograma(
    programas.findOneProgramaQuery,
    alumnos.findOneAlumnoQuery,
    alumnos.findAllAlumnosQuery,
  ),
  deleteAlumno: deleteAlumno(
    alumnos.findOneAlumnoQuery,
    alumnos.findOneAlumnoTipoTramiteQuery,
    alumnos.deleteAlumnoQuery,
    alumnos.deleteAlumnoTipoTramiteQuery,
    alumnos.deletePersonaQuery,
  ),
  alumnosInscripcion: alumnosInscripcion(
    grupos.findOneGrupoQuery,
    programas.findOneProgramaQuery,
    alumnos.findOneAlumnoQuery,
    alumnos.findOneAsignaturaQuery,
    alumnos.findOneCalificacionQuery,
    alumnos.findAllCalificacionesQuery,
    alumnos.findOneAlumnoGrupoQuery,
    alumnos.createAlumnoGrupoQuery,
    alumnos.createCalificacionQuery,
    alumnos.deleteCalificacionQuery,
  ),
  deleteAlumnoInscripcion: deleteAlumnoInscrito(
    alumnos.findOneAlumnoGrupoQuery,
    alumnos.deleteAlumnoGrupoQuery,
    alumnos.findAllCalificacionesQuery,
    alumnos.deleteCalificacionQuery,
    alumnos.findOneAlumnoQuery,
  ),
  findAlumnosInscritos: findAlumnosInscritos(
    alumnos.findAllAlumnoGrupoQuery,
    alumnos.findAllCalificacionesQuery,
  ),
  findAlumnosGrupoAsignatura: findAlumnosGrupoAsignatura(
    alumnos.findAllCalificacionesQuery,
  ),
  updateCalificaciones: updateCalificaciones(
    grupos.findOneGrupoQuery,
    programas.findOneProgramaQuery,
    alumnos.findOneAlumnoQuery,
    alumnos.findOneAsignaturaQuery,
    validaciones.findOneValidacionQuery,
    alumnos.findOneCalificacionQuery,
    alumnos.createCalificacionQuery,
    alumnos.updateCalificacionQuery,
  ),
  findCalificacionesAlumno: findCalificacionesAlumno(
    alumnos.findOneAlumnoQuery,
    alumnos.findAllCalificacionesQuery,
  ),
  findAllAlumnosCount: findAllAlumnosCount(
    alumnos.findAllAlumnosQuery,
  ),
  findAlumnosExtra: findAlumnosExtra(
    alumnos.findAllCalificacionesQuery,
    alumnos.findAllGruposQuery,
  ),
};
