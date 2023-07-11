const { checkers } = require('@siiges-services/shared');

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

  const notificacion = await db.createNotificacion(notificationData);

  // Send email notification
  await services.sendEmail(notificationData);

  notificacion.status = 'enviado';
  await notificacion.save();

  return notificacion;
};

module.exports = sendNotificationEmail;
