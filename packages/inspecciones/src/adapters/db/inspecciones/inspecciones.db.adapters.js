// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Inspecciones,
} = models;

const {
  createQuery,
} = queries;

module.exports = {
  createInspeccionesQuery: createQuery(Inspecciones),

};
