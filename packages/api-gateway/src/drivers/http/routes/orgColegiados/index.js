const { orgColegiadosAdapter } = require('../../adapters');

const {
  createOrgColegiadoSchema,
} = require('./schema');

async function orgColegiadosRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createOrgColegiadoSchema,
      onRequest: [fastify.authenticate],
    },
    orgColegiadosAdapter.createCicloEscolar,
  );

  next();
}

module.exports = orgColegiadosRouter;
