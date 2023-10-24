const findAllNotificaciones = (
  findNotificationQuery,
) => async () => {
  const include = [
    {
      association: 'usuario',
      include: [
        { association: 'persona' },
      ],
    },
  ];

  const notificaciones = await findNotificationQuery(null, { include });

  return notificaciones;
};

module.exports = { findAllNotificaciones };
