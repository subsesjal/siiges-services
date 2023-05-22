const {
  inspecciones,
} = require('../../../adapters/db');

const createInspeccion = require('./create.inspeccion.use-cases');
const deleteOne = require('./delete.inspeccion.use-cases');
const findAllInspeccionPreguntas = require('./find-all.inspeccion-preguntas.use-cases');
const createInspeccionRespuestas = require('./create.inspeccion.inspeccion-respuesta.use-cases');

module.exports = {
  createInspeccion: createInspeccion(
    inspecciones.createInspeccionQuery,
  ),
  findAllInspeccionPreguntas: findAllInspeccionPreguntas(
    inspecciones.findAllInspeccionPreguntasQuery,
  ),
  createInspeccionRespuestas: createInspeccionRespuestas(
    inspecciones.findOneInspeccionQuery,
    inspecciones.findOneInspeccionInspeccionPreguntaQuery,
    inspecciones.createInspeccionInspeccionPreguntaQuery,
    inspecciones.updateInspeccionInspeccionPreguntaQuery,
  ),
  deleteInspeccion: deleteOne(
    inspecciones.findOneQuery,
    inspecciones.deleteQuery,
  ),
};
