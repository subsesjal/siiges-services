const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createFirmaDocumento(req, reply) {
  try {
    Logger.info('[solicitudes]: Creating firma documento (masiva)');

    const documentos = req.body;

    const results = await this.solicitudFolioServices.createFirmaDocumento(documentos);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: results });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createFirmaDocumento };
