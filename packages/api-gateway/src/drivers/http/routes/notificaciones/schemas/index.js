const { findGroupNotificacionesSchema } = require('./find-group.notificaciones.schema');
const { findAllNotificacionesSchema } = require('./find-all.notificaciones.schema');
const { findOneNotificacionesSchema } = require('./find-one.notificaciones.schema');
const { deleteNotificacionesSchema } = require('./delete.notificaciones.schema');

module.exports = {
  findGroupNotificacionesSchema,
  findAllNotificacionesSchema,
  findOneNotificacionesSchema,
  deleteNotificacionesSchema,
};
