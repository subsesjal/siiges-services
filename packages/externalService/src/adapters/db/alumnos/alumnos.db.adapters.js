// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  Programa,
  UsuarioUsuario,
  Grupo,
  AlumnoGrupo,
  Asignatura,
} = models;

const {
  createQuery,
  findOneQuery,
} = queries;

module.exports = {
  createAlumnoQuery: createQuery(Alumno),
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneUserUsersQuery: findOneQuery(UsuarioUsuario),
  findOneProgramaQuery: findOneQuery(Programa),
  findOneGrupoQuery: findOneQuery(Grupo),
  findOneAlumnoGrupoQuery: findOneQuery(AlumnoGrupo),
  createAlumnoGrupoQuery: createQuery(AlumnoGrupo),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
};
