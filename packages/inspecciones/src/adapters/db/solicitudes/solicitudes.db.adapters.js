// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Solicitud,
} = models;

const {
  updateAndFindQuery,
} = queries;

module.exports = {
  updateSolicitudQuery: updateAndFindQuery(Solicitud),
};
