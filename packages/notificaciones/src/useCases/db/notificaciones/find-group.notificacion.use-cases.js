const { checkers } = require('@siiges-services/shared');

const findGroupNotificaciones = (
  findNotificationQuery,
) => async ({ usuarioId, status }) => {
  let notification;
  notification = await findNotificationQuery({ usuarioId });
  checkers.throwErrorIfDataIsFalsy(notification.length, 'Notificacion usuario', usuarioId);
  if (status) {
    notification = await findNotificationQuery({ usuarioId, status });
    checkers.throwErrorIfDataIsFalsy(notification.length, 'Notificacion status', status);
  }
  return notification;
};

module.exports = { findGroupNotificaciones };
