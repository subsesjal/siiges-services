const {
  notificaciones,
} = require('../../../adapters/db');

const createNotificacion = require('./create.notificacion.use-cases');
const { findOneNotificaciones } = require('./find-one.notificacion.use-cases');
const { findGroupNotificaciones } = require('./find-group.notificaciones.use-cases');
const { findAllNotificaciones } = require('./find-all.notificaciones.use-cases');
const { deleteNotificaciones } = require('./delete.notificacion.use-cases');

module.exports = {
  createNotificacion: createNotificacion(
    notificaciones.createQuery,
  ),
  findOneNotificaciones: findOneNotificaciones(
    notificaciones.findOneNotificationQuery,
    notificaciones.updateUserQuery,
  ),
  findGroupNotificaciones: findGroupNotificaciones(
    notificaciones.findAllQuery,
  ),
  findAllNotificaciones: findAllNotificaciones(
    notificaciones.findAllQuery,
  ),
  deleteNotificaciones: deleteNotificaciones(
    notificaciones.findOneNotificationQuery,
    notificaciones.deleteQuery,
  ),
};
