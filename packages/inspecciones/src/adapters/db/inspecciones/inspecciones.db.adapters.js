// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspeccion,
  InspeccionPregunta,
  InspeccionInspeccionPregunta,

} = models;

const {
  createQuery,
  findAllQuery,
  findOneQuery,
  updateQuery,
} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
  findOneInspeccionQuery: findOneQuery(Inspeccion),
  findAllInspeccionPreguntasQuery: findAllQuery(InspeccionPregunta),
  createInspeccionInspeccionPreguntaQuery: createQuery(InspeccionInspeccionPregunta),
  findOneInspeccionInspeccionPreguntaQuery: findOneQuery(InspeccionInspeccionPregunta),
  updateInspeccionInspeccionPreguntaQuery: updateQuery(InspeccionInspeccionPregunta),
};
