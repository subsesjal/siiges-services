const findAllInspeccionPreguntasSchema = require('./find-all.inspeccion-pregunta.schema');
const createInspeccionSchema = require('./create.inspeccion.schema');
const createInspeccionRespuestasSchema = require('./create.inspeccion-respuestas.schema');
const createInspeccionObservacionSchema = require('./create.inspeccion-observacion.schema');
const deleteInspeccionSchema = require('./delete.inspeccion.schema');
const createInspectoresProgramasSchema = require('./craate.inspectores-programas.schema');
const findAllInspectoresProgramasSchema = require('./find-all.inspectores-programas.schema');
const { deleteInspectoresProgramasSchema } = require('./delete.inspectores-programas.schema');

module.exports = {
  createInspeccionSchema,
  findAllInspeccionPreguntasSchema,
  createInspeccionRespuestasSchema,
  createInspeccionObservacionSchema,
  deleteInspeccionSchema,
  createInspectoresProgramasSchema,
  findAllInspectoresProgramasSchema,
  deleteInspectoresProgramasSchema,
};
