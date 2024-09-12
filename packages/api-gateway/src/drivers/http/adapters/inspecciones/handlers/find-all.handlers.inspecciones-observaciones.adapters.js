const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllInspeccionObservaciones(request, reply) {
  try {
    const { inspeccionId } = request.params;
    Logger.info('[api/inspecciones-observaciones/find-one]: find one the inspection-observaciones');
    const inspectionObservacion = await this.inspeccionServices
      .findAllInspeccionObservaciones({ inspeccionId });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspectionObservacion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllInspeccionObservaciones;
