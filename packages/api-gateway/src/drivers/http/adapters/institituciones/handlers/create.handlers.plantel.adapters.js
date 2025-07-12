const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function sendEmailNotification(notificacionServices, emailDestination, idUser, userName) {
  Logger.info('[notification]: Sending notification');
  await notificacionServices.sendNotificationEmail({
    usuarioId: idUser,
    email: emailDestination,
    asunto: 'SIIGES: Confirmación para Creación de Plantel',
    template: 'createPlantel',
    params: {
      user: userName,
    },
  });
}

async function createPlantel(req, reply) {
  try {
    const { institucionId } = req.params;
    const { ...data } = req.body;
    const usuarioId = req.user.id;
    const usuario = await this.usuarioServices.findOneUser({ id: usuarioId });
    const { correo } = usuario.dataValues;
    const { id } = usuario.dataValues;
    const nombreUsuario = usuario.dataValues.usuario;
    Logger.info('[instituciones]: Creating plantel in institucion');
    sendEmailNotification(this.notificacionServices, correo, id, nombreUsuario);
    const opts = [
      { association: 'domicilio' },
    ];

    const newPlantel = await this.institucionServices.createPlantel(
      institucionId,
      data,
      opts,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newPlantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createPlantel;
