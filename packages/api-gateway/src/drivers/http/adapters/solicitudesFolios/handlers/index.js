const { createSolicitudFolio } = require('./create.handlers.solicitud-folio.adapters');
const { findOneSolicitudFolio } = require('./find-one.handlers.solicitud-programa.adapters');
const { findAllSolicitudesFolios } = require('./find-all.handlers.solicitudes-programas.adapters');
const { findOneSolicitudFolioAlumno } = require('./find-one.handlers.solicitud-folios-alumnos.adapters');
const { updateSolicitudFolioAlumno } = require('./update.handlers.solicitud-folio-alumnos.adapters');

module.exports = {
  createSolicitudFolio,
  findAllSolicitudesFolios,
  findOneSolicitudFolio,
  findOneSolicitudFolioAlumno,
  updateSolicitudFolioAlumno,
};
