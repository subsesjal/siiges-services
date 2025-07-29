const { fseAdapter } = require('../../../adapters/db');
const phpAdapter = require('../../../adapters/php/helpers');
const { GenerarBeca, GenerarServicio } = require('../../../utils/pdfs');
const { buildFileHistorial } = require('./build.HISOTIAL.db.use-cases');
const { findFileBeca } = require('./find-one.Beca.db.use-cases');
const { findFileServicio } = require('./find-one.Servicio.db.use-cases');

module.exports = {
  buildFileHistorial: buildFileHistorial(
    fseAdapter.findOneAlumnoQuery,
    fseAdapter.findAllCalificacionesQuery,
    phpAdapter.createPhpFile,
  ),
  findFileBeca: findFileBeca(
    fseAdapter.findOneSolicitudBecaQuery,
    fseAdapter.findAllSolicitudBecaAlumnoQuery,
    GenerarBeca,
  ),
  findFileServicio: findFileServicio(
    fseAdapter.findOneSolicitudServSocQuery,
    fseAdapter.findAllSolicitudServSocAlumnoQuery,
    GenerarServicio,
  ),
};
