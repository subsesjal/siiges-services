// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  Programa,
  UsuarioUsuario,
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
};
