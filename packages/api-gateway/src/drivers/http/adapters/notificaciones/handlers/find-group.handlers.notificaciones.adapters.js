const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findGroupNotificaciones(req, reply) {
  try {
    Logger.info('[Notificaciones]: Getting notification');
    const { usuarioId } = req.params;
    const { status } = req.query;
    const notificacion = await this.notificacionServices.findGroupNotificaciones({
      usuarioId,
      status,
    });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: notificacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findGroupNotificaciones };
