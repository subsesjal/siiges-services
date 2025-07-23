const { createNoticiaSchema } = require('./create.noticia.schema');
const { deleteNoticiaSchema } = require('./delete.noticia.schema');
const { findAllNoticiasSchema } = require('./find-all.noticias.schema');
const { updateNoticiaSchema } = require('./update.noticia.schema');

module.exports = {
  findAllNoticiasSchema,
  createNoticiaSchema,
  updateNoticiaSchema,
  deleteNoticiaSchema,
};
