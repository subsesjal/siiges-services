const createSolicitudPrograma = require('./create.handlers.solicitud-plantel.adapters');
const findAllSolicitudesProgramas = require('./find-all.handlers.solicitudes-programas.adapters');
const updateSolicitud = require('./update.handlers.solicitudes.adapters');

module.exports = {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  updateSolicitud,
};
