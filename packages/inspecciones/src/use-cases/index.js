const {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  deleteInspeccion,
  createInspeccionObservacion,
} = require('./db/inspecciones');

module.exports = {
  createInspeccion,
  findAllInspeccionPreguntas,
  createInspeccionRespuestas,
  createInspeccionObservacion,
  deleteInspeccion,
};
