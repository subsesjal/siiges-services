// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudFolio,
} = models;

const {
  createQuery,
  countQuery,
} = queries;

module.exports = {
  createSolicitudFolioQuery: createQuery(SolicitudFolio),
  countSolicitudesFoliosQuery: countQuery(SolicitudFolio),
};
