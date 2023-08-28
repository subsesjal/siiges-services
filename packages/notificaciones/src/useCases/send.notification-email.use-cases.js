const { Logger, checkers } = require('@siiges-services/shared');

const services = require('./services');
const db = require('./db');

const sendNotificationEmail = async ({
  usuarioId, email, asunto, template, params,
}) => {
  const paramsCleaned = checkers.cleanObject(params);

  // Save the notification on DB
  const notificationData = {
    usuarioId,
    email,
    asunto,
    template,
    data: JSON.stringify(paramsCleaned),
    status: 'pending',
  };

  try {
    const notificacion = await db.createNotificacion(notificationData);
    // Send email notification
    const nodemailerService = await services.sendEmail(notificationData);

    if (nodemailerService.error) {
      throw new Error(nodemailerService.error);
    }

    notificacion.status = 'enviado';

    await notificacion.save();
    return notificacion;
  } catch (error) {
    Logger.error('Failed to send email', error);
    return error;
  }
};

module.exports = sendNotificationEmail;
