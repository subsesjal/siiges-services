const { fdaAdapter } = require('../../../adapters/db');
const { GenerarFDA01 } = require('../../../utils/pdfs');
const { GenerarFDA02 } = require('../../../utils/pdfs');
const { GenerarFDA03 } = require('../../../utils/pdfs');
const { GenerarFDA04 } = require('../../../utils/pdfs/FDA04');
const { GenerarFDA05 } = require('../../../utils/pdfs');
const { GenerarFDA06 } = require('../../../utils/pdfs');
const { GenerarFDP01 } = require('../../../utils/pdfs');
const { findFileFDP01 } = require('./find-one.FDP01.db.use-cases');
const { findFileFDA01 } = require('./find-one.FDA01.db.use-cases');
const { findFileFDA02 } = require('./find-one.FDA02.db.use-cases');
const { findFileFDA03 } = require('./find-one.FDA03.db.use-cases');
const { findFileFDA04 } = require('./find-one.FDA04.db.use-cases');
const { findFileFDA05 } = require('./find-one.FDA05.db.use-cases');
const { findFileFDA06 } = require('./find-one.FDA06.db.use-cases');

module.exports = {
  findFileFDA01: findFileFDA01(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDA01,
  ),
  findFileFDA02: findFileFDA02(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDA02,
  ),
  findFileFDA03: findFileFDA03(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDA03,
  ),
  findFileFDA04: findFileFDA04(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDA04,
  ),
  findFileFDA05: findFileFDA05(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDA05,
  ),
  findFileFDA06: findFileFDA06(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDA06,
  ),
  findFileFDP01: findFileFDP01(
    fdaAdapter.findOneSolicitudProgramaQuery,
    GenerarFDP01,
  ),
};
