// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudBeca,
} = models;

const {
  createQuery,
  countQuery,
} = queries;

module.exports = {
  createSolicitudBecaQuery: createQuery(SolicitudBeca),
  countSolicitudesBecasQuery: countQuery(SolicitudBeca),
};
