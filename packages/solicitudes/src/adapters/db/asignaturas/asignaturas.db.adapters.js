// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Asignatura,
  Programa,
} = models;

const {
  createQuery,
  findOneQuery,
} = queries;

module.exports = {
  findProgramaQuery: findOneQuery(Programa),
  createAsignaturaProgramaQuery: createQuery(Asignatura),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  updateAsignaturaQuery:createQuery(Asignatura),
};
