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

async function updateSolicitudPrograma(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudId } = req.params;

    Logger.info('[solicitudes]: Updating solicitud');

    const solicitud = await this.solicitudServices.updateSolicitudPrograma(
      { id: solicitudId },
      data,
    );
    const usuario = await this.usuarioServices.findOneUser({ id: solicitud.dataValues.usuarioId });
    const { correo } = usuario.dataValues;
    const { id } = usuario.dataValues;
    const nombreUsuario = usuario.dataValues.usuario;
    sendEmailNotification(this.notificacionServices, correo, id, nombreUsuario);
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateSolicitudPrograma;
