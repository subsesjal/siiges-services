const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes services
async function createInspeccionPreguntas(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[inspeccion/preguntas]: Creating preguntas en inspeccion');

    const inspeccionPreguntas = await this.inspeccionServices.createInspeccionPreguntas(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspeccionPreguntas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}
module.exports = createInspeccionPreguntas;
