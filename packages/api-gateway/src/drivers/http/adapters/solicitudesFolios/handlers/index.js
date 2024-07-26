const { createSolicitudFolio } = require('./create.handlers.solicitud-folio.adapters');
const { findOneSolicitudFolio } = require('./find-one.handlers.solicitud-programa.adapters');
const { findAllSolicitudesFolios } = require('./find-all.handlers.solicitudes-programas.adapters');
const { createAlumnoFolio } = require('./create-alumno.handlers.solicitud-folio.adapters');
const { findOneSolicitudFolioAlumno } = require('./find-one.handlers.solicitud-folios-alumnos.adapters');

module.exports = {
  createSolicitudFolio,
  findAllSolicitudesFolios,
  findOneSolicitudFolio,
  createAlumnoFolio,
  findOneSolicitudFolioAlumno,
};
