const { models, queries } = require('@siiges-services/core');

const {
  InspeccionPregunta,
} = models;

const {
  findAllQuery,
} = queries;

module.exports = {
  findAllInspeccionPreguntasQuery: findAllQuery(InspeccionPregunta),
};
