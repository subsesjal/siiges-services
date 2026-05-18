// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  FolioDocumentoAlumno,
  Calificacion,
  DocumentoFirmado,
} = models;

const {
  findOneQuery,
  findAllQuery,
  updateQuery,
} = queries;

module.exports = {
  findOneFolioDocumentoAlumnoQuery: findOneQuery(FolioDocumentoAlumno),
  findAllCalificacionesQuery: findAllQuery(Calificacion),
  findOneDocumentoFirmadoQuery: findOneQuery(DocumentoFirmado),
  updateDocumentoFirmadoQuery: updateQuery(DocumentoFirmado),
};
