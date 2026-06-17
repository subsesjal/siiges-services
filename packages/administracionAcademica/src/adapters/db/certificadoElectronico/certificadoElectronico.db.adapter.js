const { models, queries } = require('@siiges-services/core');

const {
  findAllQuery,
} = queries;

const {
  SolicitudFolioAlumno,
  DocumentoFirmado,
} = models;

module.exports = {
  findAllSolicitudFolioAlumnosQuery: findAllQuery(SolicitudFolioAlumno),
  findAllDocumentosFirmadosQuery: findAllQuery(DocumentoFirmado),
};
