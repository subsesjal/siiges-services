const { gradosAdapter } = require('../../adapters');

const {
  findAllGradosSchema,
  findGroupGradosSchema,
} = require('./schema');

async function cicloEscolarRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllGradosSchema,
      onRequest: [fastify.authenticate],
    },
    gradosAdapter.findAllGrados,
  );
  await fastify.get(
    '/programas/:programaId/asignaturas/',
    {
      schema: findGroupGradosSchema,
      onRequest: [fastify.authenticate],
    },
    gradosAdapter.findGroupGrados,
  );

  next();
}

module.exports = cicloEscolarRouter;
