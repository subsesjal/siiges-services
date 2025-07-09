const { noticiasAdapter } = require('../../../adapters');
const { findAllNoticiasSchema } = require('./schemas');

async function noticiasRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
      schema: findAllNoticiasSchema,
    },
    noticiasAdapter.findAllNoticias,
  );

  next();
}

module.exports = noticiasRouter;
