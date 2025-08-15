const { equivalencias } = require('../../../adapters/db');

const { createEquivalencia } = require('./create.equivalencias.use-case');
const { updateEquivalencia } = require('./update.equivalencias.use-case');

module.exports = {
  createEquivalenciaInterna: createEquivalencia(
    equivalencias.createEquivalenciaQuery,
  ),
  updateEquivalenciaInterna: updateEquivalencia(
    equivalencias.updateEquivalenciaQuery,
  ),
};
