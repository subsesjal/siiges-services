// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudFolio,
} = models;

const {
  createQuery,
  countQuery,
  findAllQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneSolicitudFolioQuery: findOneQuery(SolicitudFolio),
  createSolicitudFolioQuery: createQuery(SolicitudFolio),
  updateSolicitudFolioQuery: updateAndFindQuery(SolicitudFolio),
  countSolicitudesFoliosQuery: countQuery(SolicitudFolio),
  findAllSolicitudesFoliosQuery: findAllQuery(SolicitudFolio),
};
