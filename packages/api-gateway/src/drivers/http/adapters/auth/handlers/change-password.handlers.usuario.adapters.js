// Internal dependencies
const { Logger } = require('@siiges-services/shared');
const { changePasswordByMail, changePasswordByUserId } = require('@siiges-services/authentication');
const errorHandler = require('../../../utils/errorHandler');

async function changePassword(req, reply) {
  try {
    const {
      newPassword, oldPassword, token, userId,
    } = req.body;
    Logger.info('[auth]: Update password');

    let usuarioId;
    let email;
    let usuario;
    if (token) {
      const { correo, userId: ui, user } = await changePasswordByMail({ token, newPassword });
      usuarioId = ui;
      email = correo;
      usuario = user;
    }
    if (oldPassword) {
      const { correo, userId: ui, user } = await
      changePasswordByUserId({ userId, oldPassword, newPassword });
      usuarioId = ui;
      email = correo;
      usuario = user;
    }

    await this.notificacionServices.sendNotificationEmail({
      usuarioId,
      email,
      asunto: `CONFIRMACIÓN DE CAMBIO DE CONTRASEÑA ${usuario}`,
      template: 'changePassword',
      params: {
        usuario,
      },
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: { message: 'Correo enviado correctamente' } });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { changePassword };
