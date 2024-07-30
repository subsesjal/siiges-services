const { createSolicitudFolio } = require('./create.handlers.solicitud-folio.adapters');
const { findOneSolicitudFolio } = require('./find-one.handlers.solicitud-programa.adapters');
const { findAllSolicitudesFolios } = require('./find-all.handlers.solicitudes-programas.adapters');
const { createSolicitudFolioAlumno } = require('./create.handlers.solicitud-folio-alumno.adapters');
const { findOneSolicitudFolioAlumno } = require('./find-one.handlers.solicitud-folios-alumnos.adapters');
const { updateSolicitudFolioAlumno } = require('./update.handlers.solicitud-folio-alumnos.adapters');
const { updateSolicitudFolio } = require('./update.handlers.solicitud-folio.adapters');

module.exports = {
  createSolicitudFolio,
  findAllSolicitudesFolios,
  findOneSolicitudFolio,
  createSolicitudFolioAlumno,
  findOneSolicitudFolioAlumno,
  updateSolicitudFolioAlumno,
  updateSolicitudFolio,
};
