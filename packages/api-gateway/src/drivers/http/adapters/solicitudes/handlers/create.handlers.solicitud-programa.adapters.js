const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes services
async function createSolicitudPrograma(req, reply) {
  try {
    const { ...data } = req.body;
    const { solicitudId } = req.query;
    const { tipoSolicitudId } = data;

    Logger.info('[solicitudes]: Creating solicitud');

    let solicitud = {};

    switch (tipoSolicitudId) {
      case 1:
        solicitud = await this.solicitudServices.createNuevaSolicitudPrograma(data);
        break;
      case 2:
        solicitud = await this.solicitudServices.createRefrendoSolicitudPrograma(
          { solicitudId },
          data,
        );
        break;
      default:
        break;
    }

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createSolicitudPrograma;
