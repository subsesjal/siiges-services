const {
  inspecciones,
} = require('../../../adapters/db');

const createInspeccion = require('./create.inspeccion.use-cases');
const deleteInspeccion = require('./delete.inspeccion.use-cases');
const findAllInspeccionPreguntas = require('./find-all.inspeccion-preguntas.use-cases');
const createInspeccionRespuestas = require('./create.inspeccion.inspeccion-respuesta.use-cases');
const createInspeccionObservacion = require('./create.inspeccion-observacion.use-cases');
const createInspectorProgramas = require('./create.inspector-programas.use-cases');
const findAllInspectoresProgramas = require('./find-all.inspector-programa.use-cases');
const deleteInspectoresProgramas = require('./delete.inspectores-programas.use-cases');
const updateInspectoresProgramas = require('./update.inspectores-programas-use-cases');

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
    inspecciones.findOneInspeccionQuery,
    inspecciones.findOneInspeccionObservacionQuery,
    inspecciones.createInspeccionObservacionQuery,
    inspecciones.updateInspeccionObservacionQuery,
  ),
  deleteInspeccion: deleteInspeccion(
    inspecciones.findOneQuery,
    inspecciones.deleteQuery,
  ),
  createInspectorProgramas: createInspectorProgramas(
    inspecciones.createInspectorProgramasQuery,
    inspecciones.findOneInspectorQuery,
    inspecciones.findOneProgramasQuery,
  ),
  findAllInspectoresProgramas: findAllInspectoresProgramas(
    inspecciones.findAllInspectorProgramasQuery,
  ),
  deleteInspectoresProgramas: deleteInspectoresProgramas(
    inspecciones.findOneInspectoresProgramasQuery,
    inspecciones.deleteInspectoresProgramasQuery,
  ),
  updateInspectoresProgramas: updateInspectoresProgramas(
    inspecciones.findOneInspectoresProgramasQuery,
    inspecciones.updateInspectoresProgramasQuery,
  ),
};
