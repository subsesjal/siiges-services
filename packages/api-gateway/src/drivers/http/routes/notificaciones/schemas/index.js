const { findGroupNotificacionesSchema } = require('./find-group.notificaciones.schema');
const { findOneNotificacionesSchema } = require('./find-one.notificaciones.schema');
const { deleteNotificacionesSchema } = require('./delete.notificaciones.schema');

module.exports = {
  findGroupNotificacionesSchema,
  findOneNotificacionesSchema,
  deleteNotificacionesSchema,
};
