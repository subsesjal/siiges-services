const {
  solicitudes,
} = require('../../../adapters/db');

const createSolicitudPrograma = require('./create.solicitud-programa.use-cases');
const findAllSolicitudesProgramas = require('./find-all.solicitudes-programas.use-cases');
const findOneSolicitudPrograma = require('./find-one.solicitud-programa.use-cases');
const findSolicitudesUsuario = require('./find.solicitudes-usuario.use-cases');

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
  findSolicitudesUsuario: findSolicitudesUsuario(
    solicitudes.findAllSolicitudesProgramasQuery,
  ),
};
