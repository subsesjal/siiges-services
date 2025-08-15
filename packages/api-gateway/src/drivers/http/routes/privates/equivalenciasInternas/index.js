const { equivalenciasInternasAdapter } = require('../../../adapters');

const {
  createEquivalenciaInternaSchema,
  updateEquivalenciaInternaSchema,
} = require('./schema');

async function equivalenciaInternaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createEquivalenciaInternaSchema,
      onRequest: [fastify.authenticate],
    },
    equivalenciasInternasAdapter.createEquivalenciaInterna,
  );
  await fastify.patch(
    '/:equivalenciaId',
    {
      schema: updateEquivalenciaInternaSchema,
      onRequest: [fastify.authenticate],
    },
    equivalenciasInternasAdapter.updateEquivalenciaInterna,
  );

  next();
}

module.exports = equivalenciaInternaRouter;
