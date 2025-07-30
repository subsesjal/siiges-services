const { gruposAdapter } = require('../../../adapters/external');
const schema = require('./schema');

async function gruposRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: schema.findAllGrupos,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['externo']),
      ],
    },
    gruposAdapter.findAll,
  );

  await fastify.post(
    '/',
    {
      schema: schema.createGrupo,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['externo']),
      ],
    },
    gruposAdapter.create,
  );

  next();
}

module.exports = gruposRouter;
