// Internal dependencies
const { config } = require('@siiges-services/notificaciones');
const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function tokenRecoveryPassword(req, reply) {
  try {
    const { correo } = req.body;
    Logger.info(`[auth]: Recovery password for: ${correo}`);

    const tokenRecoveryPasswordData = await this.authServices.tokenRecoveryPassword({ correo });

    await this.notificacionServices.sendNotificationEmail({
      usuarioId: tokenRecoveryPasswordData.usuarioId,
      email: correo,
      asunto: `SOLICITUD DE CAMBIO DE CONTRASEÑA #${tokenRecoveryPasswordData.usuario}`,
      template: 'recoveryPassword',
      params: {
        usuario: tokenRecoveryPasswordData.usuario,
        token: tokenRecoveryPasswordData.token,
        url: `${config.BaseUrlFront}/recovery-password/${tokenRecoveryPasswordData.token}`,
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

module.exports = { tokenRecoveryPassword };
