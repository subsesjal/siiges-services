const { alumnos } = require('../../../adapters/db');

const createAlumnos = require('./create.alumnos.use-cases');
const inscripcionAlumnos = require('./inscripcion.alumnos.use-cases');

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
    alumnos.createAlumnoGrupoQuery,
  ),
};
