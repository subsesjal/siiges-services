// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudFolioAlumno,
  Alumno,
  FolioDocumentoAlumno,
  DocumentoFirmado,
} = models;

const {
  createQuery,
  findOneQuery,
  updateAndFindQuery,
  findAllQuery,
  deleteAndFindQuery,
  countQuery,
} = queries;

module.exports = {
  updateSolicitudFolioAlumnoQuery: updateAndFindQuery(SolicitudFolioAlumno),
  createSolicitudFolioAlumnoQuery: createQuery(SolicitudFolioAlumno),
  createFolioDocumentoAlumnoQuery: createQuery(FolioDocumentoAlumno),
  updateFolioDocumentoAlumnoQuery: updateAndFindQuery(FolioDocumentoAlumno),
  countFoliosDocumentosAlumnosQuery: countQuery(FolioDocumentoAlumno),
  findOneSolicitudFolioAlumnoQuery: findOneQuery(SolicitudFolioAlumno),
  findOneFolioDocumentoAlumnoQuery: findOneQuery(FolioDocumentoAlumno),
  findOneAlumnoQuery: findOneQuery(Alumno),
  findAllSolicitudFolioAlumnosQuery: findAllQuery(SolicitudFolioAlumno),
  deleteSolicitudFolioAlumnoQuery: deleteAndFindQuery(SolicitudFolioAlumno),
  reportFolioDocumentoAlumnoQuery: findAllQuery(FolioDocumentoAlumno),
  findAllDocumentosFirmadoQuery: findAllQuery(DocumentoFirmado),
  countSolicitudFolioAlumnosQuery: countQuery(SolicitudFolioAlumno),
};
