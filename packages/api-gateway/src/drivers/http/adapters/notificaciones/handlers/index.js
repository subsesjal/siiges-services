const { deleteNotificaciones } = require('./delete.handlers.notificaciones.adapters');
const { findGroupNotificaciones } = require('./find-group.handlers.notificaciones.adapters');
const { findAllNotificaciones } = require('./find-all.handlers.notificaciones.adapters');
const { findOneNotificaciones } = require('./find-one.handlers.notificaciones.adapters');

module.exports = {
  deleteNotificaciones,
  findGroupNotificaciones,
  findAllNotificaciones,
  findOneNotificaciones,
};
