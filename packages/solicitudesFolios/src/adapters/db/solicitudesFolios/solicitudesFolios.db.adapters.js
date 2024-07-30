// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudFolio,
  SolicitudFolioAlumno,
  Alumno,
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
  updateSolicitudFolioQuery: updateAndFindQuery(SolicitudFolio),
  countSolicitudesFoliosQuery: countQuery(SolicitudFolio),
  findAllSolicitudesFoliosQuery: findAllQuery(SolicitudFolio),
  findOneSolicitudFolioQuery: findOneQuery(SolicitudFolio),
  createAlumnoFolioQuery: createQuery(SolicitudFolioAlumno),
  findOneSolicitudFolioAlumnoQuery: findOneQuery(SolicitudFolioAlumno),
  findOneAlumnoQuery: findOneQuery(Alumno),
};
