const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createFirmaDocumento(req, reply) {
  try {
    const { folioInterno } = req.query;

    Logger.info('[solicitudes]: Creating firma documento');

    const { body } = req;
    const data = {
      pkcs7: body.pkcs7,
      objetoPorFirmar: body.objetoPorFirmar,
      tipoDocumento: body.tipoDocumento,
      folioInterno,
    };

    const documento = await this.solicitudFolioServices.createFirmaDocumento(
      data,
      { folioInterno },
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: documento });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createFirmaDocumento };
