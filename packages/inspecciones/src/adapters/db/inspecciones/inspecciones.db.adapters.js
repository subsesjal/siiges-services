// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspeccion,
  InspeccionPregunta,
  InspeccionInspeccionPregunta,
  InspeccionObservacion,
} = models;

const {
  createQuery,
  findAllQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
  findOneInspeccionQuery: findOneQuery(Inspeccion),
  findAllInspeccionPreguntasQuery: findAllQuery(InspeccionPregunta),
  createInspeccionInspeccionPreguntaQuery: createQuery(InspeccionInspeccionPregunta),
  findOneInspeccionInspeccionPreguntaQuery: findOneQuery(InspeccionInspeccionPregunta),
  updateInspeccionInspeccionPreguntaQuery: updateAndFindQuery(InspeccionInspeccionPregunta),
  createInspeccionObservacionQuery: createQuery(InspeccionObservacion),
};
