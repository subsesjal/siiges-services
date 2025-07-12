const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function sendEmailNotification(notificacionServices, emailDestination, idUser, userName) {
  Logger.info('[notification]: Sending notification');
  await notificacionServices.sendNotificationEmail({
    usuarioId: idUser,
    email: emailDestination,
    asunto: 'SIIGES: Confirmación para Eliminación de Plantel',
    template: 'deletePlantel',
    params: {
      user: userName,
    },
  });
}

async function deletePlantel(req, reply) {
  try {
    const { institucionId, plantelId } = req.params;
    const usuarioId = req.user.id;
    const usuario = await this.usuarioServices.findOneUser({ id: usuarioId });
    const { correo } = usuario.dataValues;
    const { id } = usuario.dataValues;
    const nombreUsuario = usuario.dataValues.usuario;
    Logger.info(`[instituciones]: Deleting plantel ${plantelId}`);
    sendEmailNotification(this.notificacionServices, correo, id, nombreUsuario);
    const plantel = await this.institucionServices.deletePlantel({
      institucionId,
      plantelId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deletePlantel;
