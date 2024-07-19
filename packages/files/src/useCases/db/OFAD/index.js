const { fdaAdapter } = require('../../../adapters/db');
const { GenerarOFAD } = require('../../../utils/pdfs');
const { findFileOFAD } = require('./find-one.OFAD.db.use-cases');

module.exports = {
  findFileOFAD: findFileOFAD(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarOFAD,
  ),
};
