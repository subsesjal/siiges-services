const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// inspecciones services
async function createInspeccionRespuestas(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[inspeccion/inspeccion/preguntas]: Creating respuestas en inspeccion/pregunta');

    const inspeccionPreguntas = await this.inspeccionServices.createInspeccionInspeccionPreguntas(
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspeccionPreguntas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createInspeccionRespuestas;
