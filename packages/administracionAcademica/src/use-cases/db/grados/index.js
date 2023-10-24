const { grados } = require('../../../adapters/db');

const { findAllGrados } = require('./find-all.grados.use-cases');
const { findGroupGrados } = require('./find-group.grados-programas.use-cases');

module.exports = {
  findAllGrados: findAllGrados(
    grados.findAllGradoQuery,
  ),
  findGroupGrados: findGroupGrados(
    grados.findAllGradoQuery,
    grados.findOneGradoQuery,
    grados.findAsignaturaGradoQuery,
  ),
};
