const { checkers } = require('@siiges-services/shared');

const findOneNotificaciones = (
  findNotificationQuery,
  updateNotificationQuery,
) => async ({ id }) => {
  const getNotification = await findNotificationQuery({ id });
  checkers.throwErrorIfDataIsFalsy(getNotification, 'Notificacion', id);
  let updateNotification;
  if (getNotification.status !== 'OPENED') {
    updateNotification = await updateNotificationQuery({ id }, { status: 'OPENED' });
  }
  return updateNotification || getNotification;
};

module.exports = { findOneNotificaciones };
