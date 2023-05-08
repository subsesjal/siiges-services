// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspeccion,
  InspeccionPregunta,

} = models;

const {
  createQuery,
} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
  createInspeccionPreguntaQuery: createQuery(InspeccionPregunta),
};
