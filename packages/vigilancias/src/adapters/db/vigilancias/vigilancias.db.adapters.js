// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  VigilanteVigilancia,
  Vigilante,
  VigilanciaPregunta,
} = models;

const {
  findAllQuery,
  findOneQuery,
} = queries;

module.exports = {
  findAllVigilanteVigilanciaQuery: findAllQuery(VigilanteVigilancia),
  findOneVigilanteQuery: findOneQuery(Vigilante),
  findAllVigilanciaPreguntasQuery: findAllQuery(VigilanciaPregunta),
};
