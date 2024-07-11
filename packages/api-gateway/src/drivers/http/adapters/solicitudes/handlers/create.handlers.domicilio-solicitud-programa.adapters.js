const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes services
async function createDomicilioSolicitudPrograma(req, reply) {
  try {
    const { usuarioId } = req.body;
    const { programaId, plantelId } = req.params;

    Logger.info('[solicitudes]: Creating solicitud');

    const solicitud = await this.solicitudServices.createDomicilioSolicitudPrograma(
      { usuarioId, programaId, plantelId },
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: solicitud });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createDomicilioSolicitudPrograma };
