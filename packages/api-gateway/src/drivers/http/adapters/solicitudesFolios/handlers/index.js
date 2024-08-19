// Solciitudes Folios
const { createSolicitudFolio } = require('./create.handlers.solicitud-folio.adapters');
const { findOneSolicitudFolio } = require('./find-one.handlers.solicitud-folio.adapters');
const { findAllSolicitudesFolios } = require('./find-all.handlers.solicitudes-folios.adapters');
const { updateSolicitudFolio } = require('./update.handlers.solicitud-folio.adapters');
// Solciitudes Folios Alumnos
const { createSolicitudFolioAlumno } = require('./create.handlers.solicitud-folio-alumno.adapters');
const { findOneSolicitudFolioAlumno } = require('./find-one.handlers.solicitud-folio-alumno.adapters');
const { updateSolicitudFolioAlumno } = require('./update.handlers.solicitud-folio-alumno.adapters');
const { findAllSolicitudFolioAlumnos } = require('./find-all.handlers.solicitudes-folios-alumnos.adapters');
const { deleteSolicitudFolioAlumno } = require('./delete.handlers.solicitud-folio-alumno.adapters');
const { asignacionFolioAlumno } = require('./assign.handlers.folios-alumnos.adapters');

module.exports = {
  createSolicitudFolio,
  findAllSolicitudesFolios,
  findOneSolicitudFolio,
  createSolicitudFolioAlumno,
  findOneSolicitudFolioAlumno,
  updateSolicitudFolioAlumno,
  updateSolicitudFolio,
  findAllSolicitudFolioAlumnos,
  deleteSolicitudFolioAlumno,
  asignacionFolioAlumno,
};
