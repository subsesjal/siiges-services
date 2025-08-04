const phpAdapter = require('../../../adapters/php/helpers');
const { fdaAdapter } = require('../../../adapters/db');
const { buildFileOFAD } = require('./build.OFAD.db.use-cases');
const { GenerarOFAD } = require('../../../utils/pdfs');
const { findFileOFAD } = require('./find-one.OFAD.db.use-cases');

module.exports = {
  findFileOFAD: findFileOFAD(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarOFAD,
  ),
  buildFileOFAD: buildFileOFAD(
    fdaAdapter.findOneSolicitudProgramaQuery,
    phpAdapter.createPhpFile,
  ),
};
