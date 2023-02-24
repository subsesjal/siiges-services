const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudPrograma(req, reply) {
  try {
    const { solicitudId } = req.params;

    Logger.info('[solicitudes]: Getting solicitudes list');
    const solicitudes = await this.solicitudServices.findOneSolicitudPrograma(
      { id: solicitudId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneSolicitudPrograma;
