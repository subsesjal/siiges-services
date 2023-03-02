const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findSolicitudesUsuario(req, reply) {
  try {
    const { usuarioId } = req.params;
    Logger.info('[solicitudes]: Getting solicitudes list by user');
    const solicitudes = await this.solicitudServices.findSolicitudesUsuario(
      { usuarioId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudes });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findSolicitudesUsuario;
