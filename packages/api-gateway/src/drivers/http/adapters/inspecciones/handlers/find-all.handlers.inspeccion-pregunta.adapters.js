const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllInspeccionPreguntas(req, reply) {
  try {
    Logger.info('[Inspeccion/Preguntas]: Getting inspeccion-preguntas list');
    const { query } = req;
    const inspeccionPreguntas = await this.inspeccionServices.findAllInspeccionPreguntas({ query });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: inspeccionPreguntas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAllInspeccionPreguntas;
