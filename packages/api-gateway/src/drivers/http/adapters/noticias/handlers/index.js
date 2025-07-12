const { createNoticia } = require('./create.handlers.noticias.adapters');
const deleteNoticia = require('./delete.handlers.noticias.adapters');
const { findAllNoticias } = require('./find-all.handlers.noticias.adapters');
const updateNoticia = require('./update.handlers.noticias.adapters');

module.exports = {
  findAllNoticias,
  createNoticia,
  updateNoticia,
  deleteNoticia,
};
