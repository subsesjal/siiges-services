const { fdaAdapter } = require('../../../adapters/db');
const pdfAdapter = require('../../../utils/pdfs');
const phpAdapter = require('../../../adapters/php/helpers');

const { buildFileFDP02 } = require('./build.FDP02.db.use-cases');
const { buildFileFDP05 } = require('./build.FDP05.db.use-cases');
const { buildFileFDP06 } = require('./build.FDP06.db.use-cases');
const { findFileFDP05 } = require('./find-one.FDP05.db.use-cases');
const { findFileFDP06 } = require('./find-one.FDP06.db.use-cases');
const { findFileFDP02 } = require('./find-one.FDP02.db.use-cases');
const { findFileFDP01 } = require('./find-one.FDP01.db.use-cases');

module.exports = {
  buildFileFDP02: buildFileFDP02(
    fdaAdapter.findOneSolicitudProgramaQuery,
    phpAdapter.createPhpFile,
  ),
  buildFileFDP05: buildFileFDP05(
    fdaAdapter.findOneSolicitudProgramaQuery,
    phpAdapter.createPhpFile,
  ),
  buildFileFDP06: buildFileFDP06(
    fdaAdapter.findOneSolicitudProgramaQuery,
    phpAdapter.createPhpFile,
  ),
  findFileFDP05: findFileFDP05(
    fdaAdapter.findOneSolicitudProgramaQuery,
    pdfAdapter.GenerarFDP05,
  ),
  findFileFDP06: findFileFDP06(
    fdaAdapter.findOneSolicitudProgramaQuery,
    pdfAdapter.GenerarFDP06,
  ),
  findFileFDP02: findFileFDP02(
    fdaAdapter.findOneSolicitudProgramaQuery,
    pdfAdapter.GenerarFDP02,
  ),
  findFileFDP01: findFileFDP01(
    fdaAdapter.findOneSolicitudProgramaQuery,
    pdfAdapter.GenerarFDP01,
  ),
};
