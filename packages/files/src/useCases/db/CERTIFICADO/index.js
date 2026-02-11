const { certitulosAdapter } = require('../../../adapters/db');
const { buildFileCertitulo } = require('./build.certitulo.db.use-cases');
const { GenerarCertificado } = require('../../../utils/pdfs');

module.exports = {
  buildFileCertitulo: buildFileCertitulo(
    certitulosAdapter.findOneFolioDocumentoAlumnoQuery,
    certitulosAdapter.findAllCalificacionesQuery,
    certitulosAdapter.findOneDocumentoFirmadoQuery,
    GenerarCertificado,
  ),
};
