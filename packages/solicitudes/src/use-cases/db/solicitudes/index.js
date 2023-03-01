const {
  solicitudes,
} = require('../../../adapters/db');

const createSolicitudPrograma = require('./create.solicitud-programa.use-cases');
const findAllSolicitudesProgramas = require('./find-all.solicitudes-programas.use-cases');
const findOneSolicitudPrograma = require('./find-one.solicitud-programa.use-cases');
const findAllSolicitudesUsuario = require('./find-all.solicitudes-usuario.use-cases');

module.exports = {
  createSolicitudPrograma: createSolicitudPrograma(
    solicitudes.findOneUsuarioQuery,
    solicitudes.countSolicitudesQuery,
    solicitudes.createSolicitudProgramaQuery,
  ),
  findAllSolicitudesProgramas: findAllSolicitudesProgramas(
    solicitudes.findAllSolicitudesProgramasQuery,
  ),
  findOneSolicitudPrograma: findOneSolicitudPrograma(
    solicitudes.findOneSolicitudProgramaQuery,
  ),
  findAllSolicitudesUsuario: findAllSolicitudesUsuario(
    solicitudes.findAllSolicitudesUsuarioQuery,
  ),
};
