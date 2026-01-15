const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function firmaCertificado(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[solicitudes-folios]: Iniciando firma de certificado digital');

    const resultado = await this.solicitudFolioServices.firmaCertificado(data);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: resultado });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { firmaCertificado };
