const {
  evaluaciones,
} = require('../../../adapters/db');

const { createEvaluaciones } = require('./create.evaluaciones.use-cases');
const { findOneEvaluaciones } = require('./find-one.evaluaciones.use-cases');
const { updateEvaluaciones } = require('./update.evaluaciones.use-cases');

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
  updateEvaluaciones: updateEvaluaciones(
    evaluaciones.updateEvaluacionQuery,
    evaluaciones.findOneProgramaQuery,
    evaluaciones.findOneEvaluadorQuery,
    evaluaciones.findOneModalidadQuery,
    evaluaciones.findOneEvaluacionQuery,
  ),
};
