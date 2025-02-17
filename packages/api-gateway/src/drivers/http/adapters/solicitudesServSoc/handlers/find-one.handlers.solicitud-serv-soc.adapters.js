const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudServSoc(req, reply) {
  try {
    const { solicitudServicioSocialId } = req.params;
    Logger.info(`[solicitudes Serv Soc]: Finding solicitud with id ${solicitudServicioSocialId}`);

    const solicitudServSoc = await this.solicitudServicioSocialServices
      .findOneSolicitudServSoc(solicitudServicioSocialId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudServSoc });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneSolicitudServSoc };
