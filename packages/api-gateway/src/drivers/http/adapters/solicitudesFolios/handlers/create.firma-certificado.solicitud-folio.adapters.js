const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createFirmaCertificado(req, reply) {
  try {
    const { folioDocumento } = req.query;

    Logger.info('[solicitudes]: Creating firma certificado');

    const { body } = req;

    const archivoCerBuffer = await body.archivoCer.toBuffer();
    const archivoKeyBuffer = await body.archivoKey.toBuffer();

    const data = {
      archivoCer: archivoCerBuffer.toString('base64'),
      archivoKey: archivoKeyBuffer.toString('base64'),
      passwordKey: body.passwordKey.value,
      objetoPorFirmar: body.objetoPorFirmar.value,
      folioInterno: body.folioInterno.value,
    };

    const certificado = await this.solicitudFolioServices.createFirmaCertificado(
      data,
      { folioDocumento },
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: certificado });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createFirmaCertificado };
