const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateObservaciones(req, reply) {
  try {
    const { observaciones } = req.body;
    const { solicitudFolioId } = req.params;
    Logger.info('[solicitudes]: Updating observaciones solicitud');

    const solicitudFolio = await this.solicitudFolioServices.updateSolicitudFolio(
      { id: solicitudFolioId },
      { observaciones },
    );

    if (observaciones) {
      this.notificacionServices.sendNotificationEmail({
        usuarioId: solicitudFolio?.programa?.plantel?.institucion?.usuario?.id,
        email: solicitudFolio?.programa?.plantel?.institucion?.usuario?.correo,
        asunto: 'SIGES: Atender observaciones de solicitud de folios',
        template: 'solicitudFolioObservaciones',
        params: {
          email: solicitudFolio?.programa?.plantel?.institucion?.usuario?.correo,
          usuario: solicitudFolio?.programa?.plantel?.institucion?.usuario?.usuario,
          nombre: solicitudFolio?.programa?.plantel?.institucion?.nombre,
          folioSolicitud: solicitudFolio.folioSolicitud,
          observaciones: solicitudFolio.observaciones,
        },
      });
    }

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudFolio });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateObservaciones };
