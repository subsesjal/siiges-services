const {
  inspecciones,
} = require('../../../adapters/db');

const findAllInspeccionPreguntas = require('./find-all.inspeccion-preguntas.use-cases');

module.exports = {
  findAllInspeccionPreguntas: findAllInspeccionPreguntas(
    inspecciones.findAllInspeccionPreguntasQuery,
  ),
};
