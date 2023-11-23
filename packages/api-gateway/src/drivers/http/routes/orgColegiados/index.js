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
    orgColegiadosAdapter.createOrgColegiado,
  );

  next();
}

module.exports = orgColegiadosRouter;
