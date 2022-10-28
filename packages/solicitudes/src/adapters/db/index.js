// External dependencies
const { models, queries } = require('@siiges-services/core');

const { Solicitud } = models;

const {
  createQuery,
} = queries;

module.exports = {
  createSolicitudQuery: createQuery(Solicitud),
};
