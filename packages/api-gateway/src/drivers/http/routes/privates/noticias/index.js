const { noticiasAdapter } = require('../../../adapters');
const {
  findAllNoticiasSchema, createNoticiaSchema, updateNoticiaSchema, deleteNoticiaSchema,
} = require('./schemas');

async function noticiasRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
      schema: findAllNoticiasSchema,
    },
    noticiasAdapter.findAllNoticias,
  );

  await fastify.post(
    '/',
    {
      schema: createNoticiaSchema,
      onRequest: [fastify.authenticate],
    },
    noticiasAdapter.createNoticia,
  );

  await fastify.patch(
    '/:noticiaId',
    {
      schema: updateNoticiaSchema,
      onRequest: [fastify.authenticate],
    },
    noticiasAdapter.updateNoticia,
  );

  await fastify.delete(
    '/:noticiaId',
    {
      schema: deleteNoticiaSchema,
      onRequest: [fastify.authenticate],
    },
    noticiasAdapter.deleteNoticia,
  );

  next();
}

module.exports = noticiasRouter;
