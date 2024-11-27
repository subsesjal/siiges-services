const { fseAdapter } = require('../../../adapters/db');
const { findFileSolicitudEquivalencia } = require('./find-one.SOLICITUDEQUIVALENCIA.db.use-cases');
const { GenerarSolicitudEquivalencia } = require('../../../utils/pdfs');

module.exports = {
  findFileSolicitudEquivalencia: findFileSolicitudEquivalencia(
    fseAdapter.findOneAlumnoQuery,
    fseAdapter.findAllCalificacionesQuery,
    GenerarSolicitudEquivalencia,
  ),
};
