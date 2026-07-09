const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function sendEmailNotification(notificacionServices, emailDestination, idUser, userName) {
  Logger.info('[notification]: Sending notification');
  await notificacionServices.sendNotificationEmail({
    usuarioId: idUser,
    email: emailDestination,
    asunto: 'SIGES: Confirmación de Recepción de Solicitud para Creación de Solicitud',
    template: 'createSolicitud',
    params: {
      user: userName,
    },
  });
}

async function createSolicitudPrograma(req, reply) {
  Logger.info('[solicitudes]: Crear solicitud por tipo de solicitud programa');
  try {
    const { ...data } = req.body;
    const { solicitudId, plantelId } = req.params;
    const { tipoSolicitudId } = data;

    let solicitud = {};

    switch (tipoSolicitudId) {
      case 1:
        solicitud = await this.solicitudServices.createNuevaSolicitudPrograma(data);
        break;
      case 2:
        solicitud = await this.solicitudServices.createRefrendoSolicitudPrograma(
          { solicitudId },
          data,
        );
        break;
      case 3:
        solicitud = await this.solicitudServices.createDomicilioSolicitudPrograma(
          { solicitudId, plantelId },
          data,
        );
        break;
      default:
        break;
    }

    const usuarioId = solicitud?.dataValues?.usuarioId || data.usuarioId;
    if (usuarioId) {
      try {
        const usuario = await this.usuarioServices.findOneUser({ id: usuarioId });
        sendEmailNotification(
          this.notificacionServices,
          usuario.dataValues.correo,
          usuario.dataValues.id,
          usuario.dataValues.usuario,
        );
      } catch (error) {
        Logger.warn('[notification]: no se pudo enviar el correo de creación de solicitud');
      }
    }

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createSolicitudPrograma;
