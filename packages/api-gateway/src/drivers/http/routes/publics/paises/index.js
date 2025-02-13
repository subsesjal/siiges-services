const { paisesAdapter } = require('../../../adapters');

const { findAllPaisesSchema } = require('./schema');

async function paisRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllPaisesSchema },
    paisesAdapter.findAllPaises,
  );

  next();
}

module.exports = paisRouter;
