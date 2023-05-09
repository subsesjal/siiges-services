const findAllInspeccionPreguntas = require('./find-all.handlers.inspeccion-pregunta.adapters');
const createInspeccion = require('./create.handlers.inspeccion.adapters');
const createInspeccionPreguntas = require('./create.handlers.inspeccion-preguntas.adapters');

module.exports = {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionPreguntas,
};
