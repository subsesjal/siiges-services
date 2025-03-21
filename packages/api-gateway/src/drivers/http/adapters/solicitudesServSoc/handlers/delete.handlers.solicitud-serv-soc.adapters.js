const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteSolicitudServSoc(req, reply) {
  try {
    const { solicitudServicioSocialId } = req.params;

    Logger.info(`[solicitud-servicio-social]: Deleting solicitud servicio social with id: ${solicitudServicioSocialId}`);

    const SolicitudEliminada = await this.solicitudServicioSocialServices.deleteSolicitudServSoc({
      id: solicitudServicioSocialId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: SolicitudEliminada });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { deleteSolicitudServSoc };
