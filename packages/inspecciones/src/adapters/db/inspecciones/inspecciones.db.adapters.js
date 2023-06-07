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
  updateQuery,
  updateAndFindQuery,
  deleteAndFindQuery,

} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
  findOneInspeccionQuery: findOneQuery(Inspeccion),
  deleteQuery: deleteAndFindQuery(Inspeccion),
  findOneQuery: findOneQuery(Inspeccion),
  findAllInspeccionPreguntasQuery: findAllQuery(InspeccionPregunta),
  createInspeccionInspeccionPreguntaQuery: createQuery(InspeccionInspeccionPregunta),
  findOneInspeccionInspeccionPreguntaQuery: findOneQuery(InspeccionInspeccionPregunta),
  createInspeccionObservacionQuery: createQuery(InspeccionObservacion),
  findOneInspeccionObservacionQuery: findOneQuery(InspeccionObservacion),
  updateInspeccionObservacionQuery: updateQuery(InspeccionObservacion),
  updateInspeccionInspeccionPreguntaQuery: updateAndFindQuery(InspeccionInspeccionPregunta),
};
