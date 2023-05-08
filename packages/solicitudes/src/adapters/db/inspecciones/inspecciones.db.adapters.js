const { models, queries } = require('@siiges-services/core');

const {
  InspeccionPregunta,
} = models;

const {
  createQuery,
  findAllQuery,
} = queries;

module.exports = {
  createInspeccionPreguntaQuery: createQuery(InspeccionPregunta),
  findAllInspeccionPreguntasQuery: findAllQuery(InspeccionPregunta),
};
