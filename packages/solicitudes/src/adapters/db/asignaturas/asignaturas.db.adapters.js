// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Asignatura,
  Programa,
  Grado,
} = models;

const {
  createQuery,
  findOneQuery,
  updateAndFindQuery,
  deleteAndFindQuery,
  findAllQuery,
} = queries;

module.exports = {
  findProgramaQuery: findOneQuery(Programa),
  createAsignaturaProgramaQuery: createQuery(Asignatura),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  updateAsignaturaQuery: updateAndFindQuery(Asignatura),
  deleteAsignaturaQuery: deleteAndFindQuery(Asignatura),
  findProgramaAsignaturasQuery: findAllQuery(Asignatura),
  findOneGradoQuery: findOneQuery(Grado),
};
