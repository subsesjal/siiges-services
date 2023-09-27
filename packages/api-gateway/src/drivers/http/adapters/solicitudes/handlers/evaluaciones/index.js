const { createEvaluaciones } = require('./create.handlers.evaluaciones.adapters');
const { findOneEvaluaciones } = require('./find-one.handlers.evaluaciones.adapters');
const { updateEvaluaciones } = require('./update.handlers.evaluaciones.adapters');

module.exports = {
  createEvaluaciones,
  findOneEvaluaciones,
  updateEvaluaciones,
};
