const { certitulosAdapter } = require('../../../adapters/db');
const { buildFileCertificado } = require('./build.certificado.db.use-cases');
const { GenerarCertificado } = require('../../../utils/pdfs');

module.exports = {
  buildFileCertificado: buildFileCertificado(
    certitulosAdapter.findOneFolioDocumentoAlumnoQuery,
    certitulosAdapter.findAllCalificacionesQuery,
    certitulosAdapter.findAllAsignaturasQuery,
    certitulosAdapter.findOneDocumentoFirmadoQuery,
    certitulosAdapter.updateDocumentoFirmadoQuery,
    GenerarCertificado,
  ),
};
