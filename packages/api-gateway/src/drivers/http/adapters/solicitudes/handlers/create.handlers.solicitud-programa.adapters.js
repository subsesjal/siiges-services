const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createSolicitudPrograma(req, reply) {
  Logger.info('[solicitudes]: Crear solicitud por tipo de solicitud programa');
  try {
    const { ...data } = req.body;
    const { solicitudId, plantelId } = req.params;
    const { tipoSolicitudId } = data;

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
      case 3:
        solicitud = await this.solicitudServices.createDomicilioSolicitudPrograma(
          { solicitudId, plantelId },
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
