const { checkers } = require('@siiges-services/shared');

const deleteNotificaciones = (
  findOneNotificationQuery,
  deleteQuery,
) => async ({ id }) => {
  await checkers.findValidator({ Notificacion: [id, findOneNotificationQuery] });
  const deleteNotification = await deleteQuery({ id });

  return deleteNotification;
};

module.exports = { deleteNotificaciones };
