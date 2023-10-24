const { models, queries } = require('@siiges-services/core');

const {
  Grado,
  Programa,
  Asignatura,
} = models;

const {
  findAllQuery,
  findOneQuery,
} = queries;

module.exports = {
  findAllGradoQuery: findAllQuery(Grado),
  findOneGradoQuery: findOneQuery(Programa),
  findAsignaturaGradoQuery: findAllQuery(Asignatura),
};
