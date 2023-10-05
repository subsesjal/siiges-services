const {
  evaluaciones,
} = require('../../../adapters/db');

const { createEvaluaciones } = require('./create.evaluaciones.use-cases');
const { findOneEvaluaciones } = require('./find-one.evaluaciones.use-cases');
const { findAllEvaluadores } = require('./find-all.evaluadores.use-cases');
const { updateEvaluaciones } = require('./update.evaluaciones.use-cases');
const { findCumplimiento } = require('./find.cumplimiento.use-cases');

module.exports = {
  createEvaluaciones: createEvaluaciones(
    evaluaciones.createEvaluacionQuery,
    evaluaciones.findOneProgramaQuery,
    evaluaciones.findOneEvaluadorQuery,
    evaluaciones.findOneModalidadQuery,
  ),
  findOneEvaluaciones: findOneEvaluaciones(
    evaluaciones.findOneEvaluacionQuery,
  ),
  findAllEvaluadores: findAllEvaluadores(
    evaluaciones.findAllEvaluadoresQuery,
  ),
  updateEvaluaciones: updateEvaluaciones(
    evaluaciones.updateEvaluacionQuery,
    evaluaciones.findOneProgramaQuery,
    evaluaciones.findOneEvaluadorQuery,
    evaluaciones.findOneModalidadQuery,
    evaluaciones.findOneEvaluacionQuery,
  ),
  findCumplimiento: findCumplimiento(
    evaluaciones.findAllCumplimientosQuery,
  ),
};
