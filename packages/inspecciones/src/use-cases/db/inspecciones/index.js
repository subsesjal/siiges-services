const {
  inspecciones,
} = require('../../../adapters/db');

const createInspeccion = require('./create.inspeccion.use-cases');
const createInspeccionInspeccionPreguntas = require('./create.inspeccion-inspeccion-preguntas.use-cases');

module.exports = {
  createInspeccion: createInspeccion(
    inspecciones.createInspeccionQuery,
  ),

  createInspeccionInspeccionPreguntas: createInspeccionInspeccionPreguntas(
    inspecciones.createInspeccionInspeccionPreguntaQuery,
  ),
};
