// Solciitudes Folios
const { createSolicitudFolio } = require('./create.handlers.solicitud-folio.adapters');
const { findOneSolicitudFolio } = require('./find-one.handlers.solicitud-folio.adapters');
const { findAllSolicitudesFolios } = require('./find-all.handlers.solicitudes-folios.adapters');
const { updateSolicitudFolio } = require('./update.handlers.solicitud-folio.adapters');
const { updateObservaciones } = require('./update.handlers.observaciones.adapters');
// Solciitudes Folios Alumnos
const { createSolicitudFolioAlumno } = require('./create.handlers.solicitud-folio-alumno.adapters');
const { findOneSolicitudFolioAlumno } = require('./find-one.handlers.solicitud-folio-alumno.adapters');
const { updateSolicitudFolioAlumno } = require('./update.handlers.solicitud-folio-alumno.adapters');
const { findAllSolicitudFolioAlumnos } = require('./find-all.handlers.solicitudes-folios-alumnos.adapters');
const { deleteSolicitudFolioAlumno } = require('./delete.handlers.solicitud-folio-alumno.adapters');
const { asignacionFolioAlumno } = require('./assign.handlers.folios-alumnos.adapters');
const { envioTitulacion } = require('./send.handlers.titulacion-folios.adapters');
const { reportFolioDocumentoAlumno } = require('./report.handlers.folio-documento-alumno.adapters');
const { reportFolioDocumentoAlumnoCSV } = require('./report.handlers.folio-documento-alumno-csv.adapters');

module.exports = {
  createSolicitudFolio,
  findAllSolicitudesFolios,
  findOneSolicitudFolio,
  createSolicitudFolioAlumno,
  findOneSolicitudFolioAlumno,
  updateSolicitudFolioAlumno,
  updateSolicitudFolio,
  findAllSolicitudFolioAlumnos,
  updateObservaciones,
  deleteSolicitudFolioAlumno,
  asignacionFolioAlumno,
  envioTitulacion,
  reportFolioDocumentoAlumno,
  reportFolioDocumentoAlumnoCSV,
};
