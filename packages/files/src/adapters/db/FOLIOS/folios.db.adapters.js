// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudFolio,
  SolicitudFolioAlumno,
} = models;

const {
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  findOneSolicitudFolioQuery: findOneQuery(SolicitudFolio),
  findSolicitudFolioAlumnoQuery: findAllQuery(SolicitudFolioAlumno),
};
