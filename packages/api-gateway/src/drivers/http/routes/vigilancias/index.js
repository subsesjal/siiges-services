const { vigilanciasAdapter } = require('../../adapters');

const { findGroupVigilanteVigilanciasSchema } = require('./schema');

async function vigilanciasRouter(fastify, opts, next) {
  await fastify.get(
    '/vigilanteVigilancias/:vigilanteId',
    {
      schema: findGroupVigilanteVigilanciasSchema,
      onRequest: [fastify.authenticate],
    },
    vigilanciasAdapter.findVigilanciasByVigilante,
  );

  next();
}

module.exports = vigilanciasRouter;
