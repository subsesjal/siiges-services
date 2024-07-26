// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudFolio,
  SolicitudFolioAlumno,
} = models;

const {
  createQuery,
  countQuery,
  findAllQuery,
  findOneQuery,
} = queries;

module.exports = {
  createSolicitudFolioQuery: createQuery(SolicitudFolio),
  countSolicitudesFoliosQuery: countQuery(SolicitudFolio),
  findAllSolicitudesFoliosQuery: findAllQuery(SolicitudFolio),
  findOneSolicitudFolioQuery: findOneQuery(SolicitudFolio),
  createAlumnoFolioQuery: createQuery(SolicitudFolioAlumno),
  findOneSolicitudFolioAlumnoQuery: findOneQuery(SolicitudFolioAlumno),
};
