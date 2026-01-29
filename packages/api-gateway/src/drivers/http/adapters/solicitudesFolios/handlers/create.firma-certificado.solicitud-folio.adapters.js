const { Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const errorHandler = require('../../../utils/errorHandler');

async function createFirmaCertificado(req, reply) {
  try {
    const { folioInterno } = req.query;

    Logger.info('[solicitudes]: Creating firma certificado');

    const { body } = req;

    if (!body.pkcs7) {
      throw boom.badRequest('El campo pkcs7 es requerido');
    }

    if (!body.objetoPorFirmar) {
      throw boom.badRequest('El campo objetoPorFirmar es requerido');
    }

    const data = {
      pkcs7: body.pkcs7,
      objetoPorFirmar: body.objetoPorFirmar,
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
