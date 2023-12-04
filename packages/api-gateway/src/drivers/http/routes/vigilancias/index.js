const { vigilantesAdapter } = require('../../adapters');

const {
  findVigilanciasByVigilanteSchema,
} = require('./schema');

async function vigilanteRouter(fastify, opts, next) {
  await fastify.get(
    '/vigilantes/:vigilanteId/vigilancias',
    {
      schema: findVigilanciasByVigilanteSchema,
      onRequest: [fastify.authenticate],
    },
    vigilantesAdapter.findVigilanciasByVigilante,
  );

  next();
}

module.exports = vigilanteRouter;
