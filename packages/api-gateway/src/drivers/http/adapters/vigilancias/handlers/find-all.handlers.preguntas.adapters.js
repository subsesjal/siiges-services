const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllPreguntas(req, reply) {
  try {
    Logger.info('[Vigilancias]: Getting preguntas list');
    const { query } = req;
    const vigilanciaPreguntas = await this.vigilanciaServices.findAllPreguntas({ query });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: vigilanciaPreguntas });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllPreguntas };
