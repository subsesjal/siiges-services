// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspeccion,
  InspeccionInspeccionPregunta,
  InspeccionPregunta,
} = models;

const {
  createQuery,
  findAllQuery,
} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
  findAllInspeccionPreguntasQuery: findAllQuery(InspeccionPregunta),
  createInspeccionInspeccionPreguntaQuery: createQuery(InspeccionInspeccionPregunta),
};
