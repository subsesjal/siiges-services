const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes servicio social services
async function createSolicitudServSoc(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[solicitudes Serv Soc]: Creating solicitud Serv Soc');

    const solicitudServSoc = await this.solicitudServicioSocialServices
      .createSolicitudServSoc(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudServSoc });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createSolicitudServSoc };
