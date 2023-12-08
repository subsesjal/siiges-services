const { vigilantesAdapter } = require('../../adapters');

const {
  findVigilanciasByVigilanteSchema,
} = require('./schema');

async function vigilanteRouter(fastify, opts, next) {
  await fastify.get(
    '/:vigilanteId/vigilancias',
    {
      schema: findVigilanciasByVigilanteSchema,
      // onRequest: [fastify.authenticate],
    },
    vigilantesAdapter.vigilantesAdapter,
  );

  next();
}

module.exports = vigilanteRouter;
