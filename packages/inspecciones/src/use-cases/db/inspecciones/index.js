const {
  inspecciones,
} = require('../../../adapters/db');

const createInspeccion = require('./create.inspeccion.use-cases');
const deleteInspeccion = require('./delete.inspeccion.use-cases');
const findAllInspeccionPreguntas = require('./find-all.inspeccion-preguntas.use-cases');
const createInspeccionRespuestas = require('./create.inspeccion.inspeccion-respuesta.use-cases');
const createInspeccionObservacion = require('./create.inspeccion-observacion.use-cases');

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
  createInspeccionObservacion: createInspeccionObservacion(
    inspecciones.createInspeccionObservacionQuery,
    inspecciones.findOneInspeccionQuery,
  ),
  deleteInspeccion: deleteInspeccion(
    inspecciones.findOneQuery,
    inspecciones.deleteQuery,
  ),
};
