// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  FolioDocumentoAlumno,
  Calificacion,
} = models;

const {
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  findOneFolioDocumentoAlumnoQuery: findOneQuery(FolioDocumentoAlumno),
  findAllCalificacionesQuery: findAllQuery(Calificacion),
};
