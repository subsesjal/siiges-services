const { Logger } = require('@siiges-services/shared');

const services = require('./services');
const db = require('./db');

const sendNotificationEmail = async ({
  usuarioId, email, asunto, template, params,
}) => {
  // Save the notification on DB
  const notificationData = {
    usuarioId,
    email,
    asunto,
    template,
    data: JSON.stringify(params),
    status: 'PENDIENTE',
  };

  try {
    const notificacion = await db.createNotificacion(notificationData);
    // Send email notification
    const nodemailerService = await services.sendEmail(notificationData);

    if (nodemailerService.error) {
      throw new Error(nodemailerService.error);
    }

    notificacion.status = 'ENVIADO';

    await notificacion.save();
    return notificacion;
  } catch (error) {
    Logger.error('Failed to send email', error);
    return error;
  }
};

module.exports = sendNotificationEmail;
