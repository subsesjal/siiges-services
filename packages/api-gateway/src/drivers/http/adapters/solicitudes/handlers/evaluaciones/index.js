const { createEvaluaciones } = require('./create.handlers.evaluaciones.adapters');
const { findOneEvaluaciones } = require('./find-one.handlers.evaluaciones.adapters');
const { findAllEvaluadores } = require('./find-all.handlers.evaluadores.adapters');
const { updateEvaluaciones } = require('./update.handlers.evaluaciones.adapters');

module.exports = {
  createEvaluaciones,
  findOneEvaluaciones,
  findAllEvaluadores,
  updateEvaluaciones,
};
