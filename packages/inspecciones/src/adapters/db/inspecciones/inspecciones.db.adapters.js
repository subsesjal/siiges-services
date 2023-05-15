// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspeccion,
  InspeccionPregunta,
  InspeccionRespuesta,

} = models;

const {
  createQuery,
  findAllQuery,
} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
  findAllInspeccionPreguntasQuery: findAllQuery(InspeccionPregunta),
  createInspeccionRespuestaQuery: createQuery(InspeccionRespuesta),

};
