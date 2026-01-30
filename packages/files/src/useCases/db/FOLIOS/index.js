const { foliosAdapter } = require('../../../adapters/db');
const phpAdapter = require('../../../adapters/php/helpers');

const { buildFileFOLIOCER } = require('./build.FOLIO_CER.db.use-cases');

module.exports = {
  buildFileFOLIOCER: buildFileFOLIOCER(
    foliosAdapter.findOneSolicitudFolioQuery,
    foliosAdapter.findSolicitudFolioAlumnoQuery,
    phpAdapter.createPhpFile,
  ),
};
