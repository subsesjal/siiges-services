const {
  inspecciones,
} = require('../../../adapters/db');

const createInspeccionPreguntas = require('./create.inspeccion-preguntas.use-cases');
const findAllInspeccionPreguntas = require('./find-all.inspeccion-preguntas.use-cases');

module.exports = {
  createInspeccionPreguntas: createInspeccionPreguntas(
    inspecciones.createInspeccionPreguntaQuery,
  ),
  findAllInspeccionPreguntas: findAllInspeccionPreguntas(
    inspecciones.findAllInspeccionPreguntasQuery,
  ),
};
