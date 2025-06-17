const { alumnos } = require('../../../adapters/db');

const createAlumnos = require('./create.alumnos.use-cases');
const inscripcionAlumnos = require('./inscripcion.alumnos.use-cases');
const createCalificaciones = require('./create.calificaciones.use-cases');

module.exports = {
  createAlumnos: createAlumnos(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findOneAlumnoQuery,
    alumnos.createAlumnoQuery,
  ),
  inscripcion: inscripcionAlumnos(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneGrupoQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findOneAlumnoQuery,
    alumnos.findOneAsignaturaQuery,
    alumnos.findOneAlumnoGrupoQuery,
    alumnos.findAllCalificacionesQuery,
    alumnos.createAlumnoGrupoQuery,
    alumnos.createCalificacionQuery,
    alumnos.deleteCalificacionQuery,
  ),
  calificaciones: createCalificaciones(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneGrupoQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findOneAlumnoGrupoQuery,
    alumnos.findOneAsignaturaQuery,
    alumnos.findOneCalificacionQuery,
    alumnos.createCalificacionQuery,
    alumnos.updateCalificacionQuery,
    alumnos.deleteCalificacionQuery,
  ),
};
