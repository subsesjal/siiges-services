const findAllInspeccionPreguntas = require('./find-all.handlers.inspeccion-pregunta.adapters');
const createInspeccion = require('./create.handlers.inspeccion.adapters');
const createInspeccionRespuestas = require('./create.handlers.inspeccion-respuestas.adapters');

module.exports = {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
};
