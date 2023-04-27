const { models, queries } = require('@siiges-services/core');

const {
  InspeccionPregunta,
} = models;

const {
  createQuery,
} = queries;

module.exports = {
  createInspeccionPreguntaQuery: createQuery(InspeccionPregunta),
};
