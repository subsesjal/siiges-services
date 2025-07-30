const { ciclosAdapter } = require('../../../adapters/external');
const schema = require('./schema');

async function ciclosEscolaresRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: schema.findAllCiclosEscolares,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['externo']),
      ],
    },
    ciclosAdapter.findAll,
  );

  await fastify.post(
    '/',
    {
      schema: schema.createCicloEscolar,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['externo']),
      ],
    },
    ciclosAdapter.create,
  );

  next();
}

module.exports = ciclosEscolaresRouter;
