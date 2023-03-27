// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Asignatura,
  Programa,
} = models;

const {
  createQuery,
  findOneQuery,
  updateQuery,
  deleteAndFindQuery,
  findAllQuery,
} = queries;

module.exports = {
  findProgramaQuery: findOneQuery(Programa),
  createAsignaturaProgramaQuery: createQuery(Asignatura),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  updateAsignaturaQuery: updateQuery(Asignatura),
  deleteAsignaturaQuery: deleteAndFindQuery(Asignatura),
  findProgramaAsignaturasQuery: findAllQuery(Asignatura),
};
