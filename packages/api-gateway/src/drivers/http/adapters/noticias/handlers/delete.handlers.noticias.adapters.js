const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function deleteNoticia(req, reply) {
  try {
    const { noticiaId } = req.params;

    Logger.info(`[noticias]: Deleting noticia: ${noticiaId}`);
    const noticiaDeleted = await this.noticiaServices.deleteNoticia({
      id: noticiaId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: noticiaDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteNoticia;
