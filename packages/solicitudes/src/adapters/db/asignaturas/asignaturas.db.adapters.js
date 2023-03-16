// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Asignatura,
  Programa,
} = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  findProgramaQuery: findOneQuery(Programa),
  createAsignaturaProgramaQuery: createQuery(Asignatura),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  findProgramaAsignaturasQuery: findAllQuery(Asignatura),
};
