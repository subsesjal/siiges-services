const {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  deleteInspeccion,
  createInspeccionObservacion,
  createInspectorProgramas,
  findAllInspectores,
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
  findAllInspectores,
  deleteInspectoresProgramas,
  updateInspectoresProgramas,
};
