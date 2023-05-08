const {
  inspecciones,
} = require('../../../adapters/db');

const createInspeccion = require('./create.inspeccion.use-cases');
const createInspeccionPreguntas = require('./create.inspeccion-preguntas.use-cases');

module.exports = {
  createInspeccion: createInspeccion(
    inspecciones.createInspeccionQuery,
  ),
  createInspeccionPreguntas: createInspeccionPreguntas(
    inspecciones.createInspeccionPreguntaQuery,
  ),

};
