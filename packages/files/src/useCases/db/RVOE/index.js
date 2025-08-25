const { fdaAdapter } = require('../../../adapters/db');
const phpAdapter = require('../../../adapters/php/helpers');
const { findFileRVOE } = require('./find-one.RVOE.db.use-cases');
const { GenerarRVOE } = require('../../../utils/pdfs');
const { buildFileAcuerdoRvoe } = require('./build.acuerdoRvoe.db.use-cases');

module.exports = {
  findFileRVOE: findFileRVOE(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarRVOE,
  ),
  buildFileAcuerdoRvoe: buildFileAcuerdoRvoe(
    fdaAdapter.findOneSolicitudProgramaQuery,
    phpAdapter.createPhpFile,
  ),
};
