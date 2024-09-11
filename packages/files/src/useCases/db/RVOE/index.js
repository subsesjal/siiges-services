const { fdaAdapter } = require('../../../adapters/db');
const { findFileRVOE } = require('./find-one.RVOE.db.use-cases');
const { GenerarRVOE } = require('../../../utils/pdfs');

module.exports = {
  findFileRVOE: findFileRVOE(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarRVOE,
  ),
};
