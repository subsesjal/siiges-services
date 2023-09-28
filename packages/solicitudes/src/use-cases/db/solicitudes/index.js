const {
  solicitudes,
} = require('../../../adapters/db');

const createSolicitudPrograma = require('./create.solicitud-programa.use-cases');
const findAllSolicitudesProgramas = require('./find-all.solicitudes-programas.use-cases');
const findOneSolicitudPrograma = require('./find-one.solicitud-programa.use-cases');
const findOneSolicitudDetalle = require('./find-one.solicitud-detalle.use-cases');
const findSolicitudesUsuario = require('./find.solicitudes-usuario.use-cases');
const updateSolicitudPrograma = require('./update.solicitud-programa.use-cases');
const setSolicitudSeccion = require('./set.solicitud-seccion.use-cases');
const updateSolcitudSeccionObservacion = require('./update.seccion-observacion.use-cases');
const findOneSolicitudSeccion = require('./find-one.solicitud-seccion.use-cases');

module.exports = {
  createSolicitudPrograma: createSolicitudPrograma(
    solicitudes.findOneUsuarioQuery,
    solicitudes.countSolicitudesQuery,
    solicitudes.createSolicitudProgramaQuery,
    solicitudes.createProgramaTurnoQuery,
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
  updateSolicitudPrograma: updateSolicitudPrograma(
    solicitudes.findOneSolicitudQuery,
    solicitudes.findOneProgramaTurnoQuery,
    solicitudes.findOneProgramaQuery,
    solicitudes.updateSolicitudQuery,
    solicitudes.updateProgramaQuery,
    solicitudes.createProgramaTurnoQuery,
    solicitudes.deleteProgramaTurnoQuery,
  ),
  setSolicitudSeccion: setSolicitudSeccion(
    solicitudes.findOneSolicitudQuery,
    solicitudes.findOneSolicitudSeccionQuery,
    solicitudes.createSolicitudSeccionQuery,
    solicitudes.updateSolicitudSeccionQuery,
  ),
  findOneSolicitudSeccion: findOneSolicitudSeccion(
    solicitudes.findOneSolicitudQuery,
    solicitudes.findOneSolicitudSeccionQuery,
  ),
  updateSolcitudSeccionObservacion: updateSolcitudSeccionObservacion(
    solicitudes.findOneSolicitudSeccionQuery,
    solicitudes.createSolicitudSeccionQuery,
    solicitudes.updateSolicitudSeccionQuery,
  ),
  findOneSolicitudDetalle: findOneSolicitudDetalle(
    solicitudes.findOneSolicitudProgramaQuery,
  ),
};
