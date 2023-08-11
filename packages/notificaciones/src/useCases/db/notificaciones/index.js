const {
  notificaciones,
} = require('../../../adapters/db');

const createNotificacion = require('./create.notificacion.use-cases');

module.exports = {
  createNotificacion: createNotificacion(
    notificaciones.createQuery,
  ),
};
