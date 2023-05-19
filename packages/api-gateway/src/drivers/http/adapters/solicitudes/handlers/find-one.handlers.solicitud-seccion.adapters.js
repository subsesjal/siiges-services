const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneSolicitudSeccion(req, reply) {
  try {
    const { solicitudId, seccionId } = req.params;

    Logger.info('[solicitudes]: Find status solicitud - seccion');
    const solicitudSeccion = await this.solicitudServices.findOneSolicitudSeccion(
      { solicitudId, seccionId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitudSeccion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneSolicitudSeccion;
