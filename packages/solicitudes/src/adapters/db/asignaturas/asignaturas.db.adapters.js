// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Asignatura,
  Programa,
} = models;

const {
  createQuery,
  findOneQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  findProgramaQuery: findOneQuery(Programa),
  createAsignaturaProgramaQuery: createQuery(Asignatura),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  deleteAsignaturaQuery: deleteAndFindQuery(Asignatura),
};
