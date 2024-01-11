const { vigilanciasAdapter } = require('../../adapters');

const vigilanciasSchemas = require('./schema');

async function vigilanciasRouter(fastify, opts, next) {
  await fastify.get(
    '/vigilanteVigilancias/:vigilanteId',
    {
      schema: vigilanciasSchemas.findGroupVigilanteVigilanciasSchema,
      onRequest: [fastify.authenticate],
    },
    vigilanciasAdapter.findVigilanciasByVigilante,
  );

  await fastify.get(
    '/vigilante/:personaId',
    {
      schema: vigilanciasSchemas.findOneVigilanteSchema,
      onRequest: [fastify.authenticate],
    },
    vigilanciasAdapter.findOneVigilante,

  );

  await fastify.get(
    '/preguntas',
    {
      schema: vigilanciasSchemas.findAllPreguntasSchema,
      onRequest: [fastify.authenticate],
    },
    vigilanciasAdapter.findAllPreguntas,
  );

  next();
}

module.exports = vigilanciasRouter;
