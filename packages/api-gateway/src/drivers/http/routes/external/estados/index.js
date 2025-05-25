const { estadosAdapter } = require('../../../adapters');

const { findAllEstadosSchema } = require('./schema');

async function estadoRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllEstadosSchema,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['admin']),
      ],
    },
    estadosAdapter.findAllEstados,
  );

  next();
}

module.exports = estadoRouter;
