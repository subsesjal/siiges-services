const { programasAdapter } = require('../../../adapters');
const { findRvoePublicSchema } = require('./schema');

async function rvoesRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findRvoePublicSchema },
    programasAdapter.findRvoePublic,
  );

  next();
}

module.exports = rvoesRouter;
