const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateSolicitudServSoc(req, reply) {
  try {
    const data = req.body;
    const { solicitudServicioSocialId } = req.params;

    Logger.info('[solicitudes Serv Soc]: Updating solicitud Serv Soc');

    const updatedServSoc = await this.solicitudServicioSocialServices
      .updateSolicitudServSoc(data, { id: solicitudServicioSocialId });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: updatedServSoc });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateSolicitudServSoc };
