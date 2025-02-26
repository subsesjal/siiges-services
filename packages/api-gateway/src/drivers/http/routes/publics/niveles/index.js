const { nivelesAdapter } = require('../../../adapters');
const { findAllNivelesSchema } = require('./schema');

async function nivelesRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllNivelesSchema },
    nivelesAdapter.findAllNiveles,
  );

  next();
}

module.exports = nivelesRouter;
