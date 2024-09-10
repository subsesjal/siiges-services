const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findOneInspeccionesPreguntas(request, reply) {
  try {
    const { inspeccionId } = request.params;
    Logger.info('[api/inspecciones-preguntas/find-one]: find one the inspection-questions');
    const inspectionQuestions = await this.inspeccionServices
      .findOneInspeccionesPreguntas({ inspeccionId });
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspectionQuestions });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneInspeccionesPreguntas };
