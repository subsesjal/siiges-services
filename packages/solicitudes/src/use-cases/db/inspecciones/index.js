const {
  inspeccion,
} = require('../../../adapters/db');

const createInspeccionPreguntas = require('./create.inspeccion-preguntas.use-cases');

module.exports = {
  createInspeccionPreguntas: createInspeccionPreguntas(
    inspeccion.createInspeccionPreguntaQuery,
  ),
};
