const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// inspecciones services
async function createInspeccionRespuestas(request, reply) {
  try {
    const { inspeccionId } = request.params;
    const data = request.body;

    Logger.info('[inspeccion/inspeccion/preguntas]: Creating respuestas en inspeccion/pregunta');

    const inspeccionRespuestas = await this.inspeccionServices.createInspeccionRespuestas(
      { inspeccionId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspeccionRespuestas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInspeccionRespuestas;
