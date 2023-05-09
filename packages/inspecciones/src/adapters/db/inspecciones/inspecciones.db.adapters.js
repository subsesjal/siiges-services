// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspeccion,
  InspeccionInspeccionPregunta,
} = models;

const {
  createQuery,
} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
  createInspeccionInspeccionPreguntaQuery: createQuery(InspeccionInspeccionPregunta),
};
