const createSolicitudPrograma = require('./create.handlers.solicitud-programa.adapters');
const findAllSolicitudesProgramas = require('./find-all.handlers.solicitudes-programas.adapters');
const findOneSolicitudPrograma = require('./find-one.handlers.solicitud-programa.adapters');
const findSolicitudesUsuario = require('./find.handlers.solicitudes-usuario.adapters');
const updateSolicitudPrograma = require('./update.handlers.solicitud-programa.adapters');
const setSolicitudSeccion = require('./set.handlers.solicitud-seccion.adapters');
const updateSolcitudSeccionObservacion = require('./update.handlers.seccion-observacion.adapters');
const findOneSolicitudSeccion = require('./find-one.handlers.solicitud-seccion.adapters');
const {
  createEvaluaciones,
  findOneEvaluaciones,
  updateEvaluaciones,
} = require('../../solicitud/evaluaciones');

module.exports = {
  createSolicitudPrograma,
  findAllSolicitudesProgramas,
  findOneSolicitudPrograma,
  findSolicitudesUsuario,
  updateSolicitudPrograma,
  setSolicitudSeccion,
  updateSolcitudSeccionObservacion,
  findOneSolicitudSeccion,
  createEvaluaciones,
  findOneEvaluaciones,
  updateEvaluaciones,
};
