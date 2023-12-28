// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  VigilanteVigilancia,
} = models;

const {
  findAllQuery,
} = queries;

module.exports = {
  findAllVigilanteVigilanciaQuery: findAllQuery(VigilanteVigilancia),

};
