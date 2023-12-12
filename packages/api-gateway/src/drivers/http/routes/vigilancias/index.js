const { vigilantesAdapter } = require('../../adapters');

const {
  findVigilanciasByVigilanteSchema,
} = require('./schema');

async function vigilanteRouter(fastify, opts, next) {
  await fastify.get(
    '/vigilante/:vigilanteId',
    {
      schema: findVigilanciasByVigilanteSchema,
      onRequest: [fastify.authenticate],
    },
    vigilantesAdapter.vigilantesAdapter,
  );

  next();
}

module.exports = vigilanteRouter;
