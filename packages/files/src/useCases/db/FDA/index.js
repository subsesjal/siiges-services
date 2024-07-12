const { fdaAdapter } = require('../../../adapters/db');
const { GenerarFDA02 } = require('../../../utils/pdfs');

const { findFileFDA02 } = require('./find-one.FDA02.db.use-cases');

module.exports = {
  findFileFDA02: findFileFDA02(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDA02,
  ),
};
