const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findAllNoticias(req, reply) {
  try {
    Logger.info('[Noticias]: Getting noticias');
    const noticias = await this.noticiaServices.findAllNoticias();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: noticias });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllNoticias };
