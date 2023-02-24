const createSolicitudPrograma = require('./create.handlers.solicitud-plantel.adapters');
const findAllSolicitudesProgramas = require('./find-all.handlers.solicitudes-programas.adapters');
const findOneSolicitudesProgramas = require('./find-one.handlers.solicitudes-programas.adapters');

module.exports = {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudesProgramas,
};
