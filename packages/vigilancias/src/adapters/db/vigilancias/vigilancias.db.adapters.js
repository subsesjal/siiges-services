// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  VigilanteVigilancia,
  Vigilante,
} = models;

const {
  findAllQuery,
  findOneQuery,
} = queries;

module.exports = {
  findAllVigilanteVigilanciaQuery: findAllQuery(VigilanteVigilancia),
  findOneVigilanteQuery: findOneQuery(Vigilante),
};
