const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllNotificaciones(req, reply) {
  try {
    Logger.info('[Notificaciones]: Getting notifications');
    const notificaciones = await this.notificacionServices.findAllNotificaciones();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: notificaciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllNotificaciones };
