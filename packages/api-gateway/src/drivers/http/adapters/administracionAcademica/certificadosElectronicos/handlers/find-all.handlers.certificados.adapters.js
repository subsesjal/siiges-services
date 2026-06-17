const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findAllCertificados(req, reply) {
  try {
    Logger.info('[CertificadosElectronicos]: findAllCertificados - Request received');
    const { numeroRvoe } = req.query;

    const certificados = await this.administracionAcademicaServices
      .findAllCertificados({ numeroRvoe });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: certificados });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllCertificados };
