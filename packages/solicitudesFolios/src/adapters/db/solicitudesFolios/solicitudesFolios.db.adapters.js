// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudFolio, SolicitudFolioAlumno,
} = models;

const {
  createQuery,
  countQuery,
  findAllQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  updateAndFindSolicitudQuery: updateAndFindQuery(SolicitudFolioAlumno),
  createSolicitudFolioQuery: createQuery(SolicitudFolio),
  countSolicitudesFoliosQuery: countQuery(SolicitudFolio),
  findAllSolicitudesFoliosQuery: findAllQuery(SolicitudFolio),
  findOneSolicitudFolioQuery: findOneQuery(SolicitudFolio),
  findOneSolicitudFolioAlumnoQuery: findOneQuery(SolicitudFolioAlumno),
};
