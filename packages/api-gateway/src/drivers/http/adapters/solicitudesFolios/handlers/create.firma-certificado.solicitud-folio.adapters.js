const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createFirmaCertificado(req, reply) {
  try {
    const { folioInterno } = req.query;

    Logger.info('[solicitudes]: Creating firma certificado');

    const { body } = req;
    const data = {
      pkcs7: body.pkcs7,
      objetoPorFirmar: body.objetoPorFirmar,
      tipoDocumento: body.tipoDocumento,
      folioInterno,
    };

    const certificado = await this.solicitudFolioServices.createFirmaCertificado(
      data,
      { folioInterno },
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
