const {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  deleteInspeccion,
  createInspeccionObservacion,
  createInspectorProgramas,
  findAllInspectoresProgramas,
} = require('./db/inspecciones');

module.exports = {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  createInspeccionObservacion,
  deleteInspeccion,
  createInspectorProgramas,
  findAllInspectoresProgramas,
};
