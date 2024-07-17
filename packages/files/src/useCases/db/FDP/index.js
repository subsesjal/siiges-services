const { fdaAdapter } = require('../../../adapters/db');
const { GenerarFDP05 } = require('../../../utils/pdfs');
const { GenerarFDP06 } = require('../../../utils/pdfs');
const { GenerarFDP02 } = require('../../../utils/pdfs');
const { findFileFDP05 } = require('./find-one.FDP05.db.use-cases');
const { findFileFDP06 } = require('./find-one.FDP06.db.use-cases');
const { findFileFDP02 } = require('./find-one.FDP02.db.use-cases');

module.exports = {
  findFileFDP05: findFileFDP05(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDP05,
  ),
  findFileFDP06: findFileFDP06(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDP06,
  ),
  findFileFDP02: findFileFDP02(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDP02,
  ),
};
