const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionesSchema,

} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createInspeccionesSchema },
    inspeccionesAdapter.createInspecciones,
  );

  next();
}

module.exports = inspeccionRouter;
