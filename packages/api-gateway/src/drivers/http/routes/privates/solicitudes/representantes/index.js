const { representativeAdapter } = require('../../../../adapters');
const { createSchema } = require('./schemas');

async function usuarioRouter(fastify, _, next) {
  await fastify.post(
    '/',
    { schema: createSchema },
    representativeAdapter.create,
  );

  next();
}

module.exports = usuarioRouter;
