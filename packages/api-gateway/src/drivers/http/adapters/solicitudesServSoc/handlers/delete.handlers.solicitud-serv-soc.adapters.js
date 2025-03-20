const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

const deleteSolicitudServSoc = async (req, reply) => {
  try {
    const { solicitudServicioSocialId } = req.params;

    Logger.info(`[solicitud-servicio-social]: Deleting solicitud servicio social with id: ${solicitudServicioSocialId}`);

    const SolicitudEliminada = await req.server.solicitudServicioSocialServices.deleteSolicitudServSoc({
      id: solicitudServicioSocialId,
    });

    Logger.info(`[DELETE Solicitud con id ${solicitudServicioSocialId} eliminada correctamente`);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: SolicitudEliminada });
  } catch (error) {
    return errorHandler(error, reply);
  }
};

module.exports = { deleteSolicitudServSoc };
