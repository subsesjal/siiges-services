const {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  deleteInspeccion,
  createInspeccionObservacion,
  createInspectorProgramas,
  findAllInspectoresProgramas,
  deleteInspectoresProgramas,
  updateInspectoresProgramas,
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
  updateInspectoresProgramas,
};
