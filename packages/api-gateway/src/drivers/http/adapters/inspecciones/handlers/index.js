const findAllInspeccionPreguntas = require('./find-all.handlers.inspeccion-pregunta.adapters');
const createInspeccion = require('./create.handlers.inspeccion.adapters');
const createInspeccionRespuestas = require('./create.handlers.inspeccion-respuestas.adapters');
const createInspeccionObservacion = require('./create.handlers.inspeccion-observacion.adapters');

module.exports = {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  createInspeccionObservacion,
};
