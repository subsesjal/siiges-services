const { estadosAdapter } = require('../../../adapters');

const { findAllEstadosSchema } = require('./schema');

async function estadoRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllEstadosSchema },
    estadosAdapter.findAllEstados,
  );

  next();
}

module.exports = estadoRouter;
