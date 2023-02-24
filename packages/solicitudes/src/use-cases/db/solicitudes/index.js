const {
  solicitudes,
} = require('../../../adapters/db');

const createSolicitudPrograma = require('./create.solicitud-programa.use-cases');
const findAllSolicitudesProgramas = require('./find-all.solicitudes-programas.use-cases');
const findOneSolicitudesProgramas = require('./find-one.solicitudes-programas.use-cases');

module.exports = {
  createSolicitudPrograma: createSolicitudPrograma(
    solicitudes.findOneUsuarioQuery,
    solicitudes.countSolicitudesQuery,
    solicitudes.createSolicitudProgramaQuery,
  ),
  findAllSolicitudesProgramas: findAllSolicitudesProgramas(
    solicitudes.findAllSolicitudesProgramasQuery,
  ),
  findOneSolicitudesProgramas: findOneSolicitudesProgramas(
    solicitudes.findOneSolicitudesProgramasQuery,
  ),

};
