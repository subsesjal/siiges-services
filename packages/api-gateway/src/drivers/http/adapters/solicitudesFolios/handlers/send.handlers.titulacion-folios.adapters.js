const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function envioTitulacion(req, reply) {
  try {
    const { solicitudFolioId } = req.params;
    Logger.info('[solicitudes]: Creating solicitud');

    const solicitudFolio = await this.solicitudFolioServices.envioTitulacion(
      { id: solicitudFolioId },
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolio });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { envioTitulacion };
