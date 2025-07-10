const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createNoticia(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[noticias]: Creating Noticia', data);

    const newNoticia = await this.noticiaServices.createNoticia(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newNoticia });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createNoticia };
