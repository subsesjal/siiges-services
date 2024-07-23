const { createSolicitudFolio } = require('./create.handlers.solicitud-folio.adapters');
const { findOneSolicitudFolio } = require('./find-one.handlers.solicitud-programa.adapters');
const { findAllSolicitudesFolios } = require('./find-all.handlers.solicitudes-programas.adapters');

module.exports = {
  createSolicitudFolio,
  findAllSolicitudesFolios,
  findOneSolicitudFolio,
};
