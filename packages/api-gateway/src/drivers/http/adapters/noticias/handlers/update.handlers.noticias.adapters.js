const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function updateNoticia(req, reply) {
  try {
    Logger.info('[noticias]: Updating Noticia');

    const { noticiaId } = req.params;
    const { ...data } = req.body;

    const noticiaUpdated = await this.noticiaServices.updateNoticia(
      { id: noticiaId },
      data,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: noticiaUpdated });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateNoticia;
