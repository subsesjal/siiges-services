const {
  noticias,
} = require('../../../adapters/db');

const { createNoticia } = require('./create.noticia.use-cases');
const { findOneNoticia } = require('./find-one.noticia.use-cases');
const { findAllNoticias } = require('./find-all.noticias.use-cases');
const { deleteNoticia } = require('./delete.noticia.use-cases');
const { updateNoticia } = require('./update.noticia.use-cases');

module.exports = {
  createNoticia: createNoticia(
    noticias.createNoticiaQuery,
  ),
  findOneNoticia: findOneNoticia(
    noticias.findOneNoticiaQuery,
  ),
  findAllNoticias: findAllNoticias(
    noticias.findAllNoticiaQuery,
  ),
  deleteNoticia: deleteNoticia(
    noticias.deleteNoticiaQuery,
  ),
  updateNoticia: updateNoticia(
    noticias.updateNoticiaQuery,
  ),
};
