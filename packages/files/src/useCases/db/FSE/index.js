const { fseAdapter } = require('../../../adapters/db');
const { GenerarHistorial, GenerarBeca } = require('../../../utils/pdfs');
const { findFileHistorial } = require('./find-one.Historial.db.use-cases');
const { findFileBeca } = require('./find-one.Beca.db.use-cases');

module.exports = {
  findFileHistorial: findFileHistorial(
    fseAdapter.findOneAlumnoQuery,
    fseAdapter.findAllCalificacionesQuery,
    GenerarHistorial,
  ),
  findFileBeca: findFileBeca(
    fseAdapter.findOneSolicitudBecaQuery,
    fseAdapter.findAllSolicitudBecaAlumnoQuery,
    GenerarBeca,
  ),
};
