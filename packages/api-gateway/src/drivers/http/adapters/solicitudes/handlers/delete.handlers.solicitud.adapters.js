const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function sendEmailNotification(notificacionServices, emailDestination, idUser, userName) {
  Logger.info('[notification]: Sending notification');
  await notificacionServices.sendNotificationEmail({
    usuarioId: idUser,
    email: emailDestination,
    asunto: 'SIIGES: Confirmación de Eliminación de Solicitud',
    template: 'deleteSolicitud',
    params: {
      user: userName,
    },
  });
}

async function deleteSolicitud(req, reply) {
  try {
    const { solicitudId } = req.params;
    const solicitudData = await this.solicitudServices.findOneSolicitudPrograma(
      { id: solicitudId },
    );
    Logger.info(`[Solicitud]: Deleting solicitud with id: ${solicitudId}`);
    const solicitud = await this.solicitudServices.deleteSolicitud({
      id: solicitudId,
    });
    const { usuarioId } = solicitudData.dataValues;
    const usuario = await this.usuarioServices.findOneUser({ id: usuarioId });
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

module.exports = deleteSolicitud;
