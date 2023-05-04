const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createInspeccionSchema },
    inspeccionesAdapter.createInspeccion,
  );

  next();
}

module.exports = inspeccionRouter;
