const {
  inspecciones,
} = require('../../../adapters/db');

const createInspeccion = require('./create.inspeccion.use-cases');
const findAllInspeccionPreguntas = require('./find-all.inspeccion-preguntas.use-cases');
const createinspeccionRespuesta = require('./create.inspeccion.inspeccionRespuesta.use-cases');

module.exports = {
  createInspeccion: createInspeccion(
    inspecciones.createInspeccionQuery,
  ),
  findAllInspeccionPreguntas: findAllInspeccionPreguntas(
    inspecciones.findAllInspeccionPreguntasQuery,
  ),
  createinspeccionRespuesta: createinspeccionRespuesta(
    inspecciones.createInspeccionRespuestaQuery,
  ),
};
