const createInspeccion = require('./create.handlers.inspeccion.adapters');
const createInspeccionPreguntas = require('./create.handlers.inspeccion-preguntas.adapters');
const findAllInspeccionPreguntas = require('./find-all.handlers.inspeccion-pregunta.adapters');

module.exports = {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionPreguntas,
};
