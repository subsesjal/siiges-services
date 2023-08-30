const {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  deleteInspeccion,
  createInspeccionObservacion,
  createInspectorProgramas,
  findAllInspectoresProgramas,
  deleteInspectoresProgramas,
} = require('./db/inspecciones');

module.exports = {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  createInspeccionObservacion,
  deleteInspeccion,
  createInspectorProgramas,
  findAllInspectoresProgramas,
  deleteInspectoresProgramas,
};
