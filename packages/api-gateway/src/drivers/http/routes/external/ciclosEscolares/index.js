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

  next();
}

module.exports = ciclosEscolaresRouter;
