// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspeccion,
} = models;

const {
  createQuery,
} = queries;

module.exports = {
  createInspeccionQuery: createQuery(Inspeccion),
};
