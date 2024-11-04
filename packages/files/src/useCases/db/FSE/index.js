const { fseAdapter } = require('../../../adapters/db');
const { GenerarHistorial } = require('../../../utils/pdfs');
const { findFileHistorial } = require('./find-one.Historial.db.use-cases');

module.exports = {
  findFileHistorial: findFileHistorial(
    fseAdapter.findOneAlumnoQuery,
    fseAdapter.findAllCalificacionesQuery,
    GenerarHistorial,
  ),
};
