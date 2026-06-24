const { certificadoElectronico } = require('../../../adapters/db');

const { findAllCertificados } = require('./find-all.certificados.use-cases');

module.exports = {
  findAllCertificados: findAllCertificados(
    certificadoElectronico.findAllSolicitudFolioAlumnosQuery,
    certificadoElectronico.findAllDocumentosFirmadosQuery,
  ),
};
