const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneNotificaciones(req, reply) {
  try {
    Logger.info('[Notificaciones]: Getting notification');
    const { notificacionId } = req.params;
    const notificacion = await this.notificacionServices.findOneNotificaciones({
      id: notificacionId,
    });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: notificacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneNotificaciones };
