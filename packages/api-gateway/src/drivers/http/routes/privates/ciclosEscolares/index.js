const { ciclosEscolaresAdapter } = require('../../../adapters');

const {
  createCicloEscolarSchema,
  deleteCicloEscolarSchema,
  findGroupCicloEscolarSchema,
  findOneCicloEscolarSchema,
  updateCicloEscolarSchema,
  findCatalogoCicloEscolarSchema,
  updateCatalogoCicloEscolarSchema,
  createCatalogoCicloEscolarSchema,
} = require('./schema');

async function cicloEscolarRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.createCicloEscolar,
  );

  await fastify.get(
    '/:cicloEscolarId',
    {
      schema: findOneCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.findOneCicloEscolar,
  );
  await fastify.get(
    '/programas/:programaId',
    {
      schema: findGroupCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.findGroupCicloEscolar,
  );
  await fastify.get(
    '/catalogo',
    {
      schema: findCatalogoCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.findCatalogoCicloEscolar,
  );
  await fastify.post(
    '/catalogo',
    {
      schema: createCatalogoCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.createCatalogoCicloEscolar,
  );
  await fastify.patch(
    '/catalogo/:id',
    {
      schema: updateCatalogoCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.updateCatalogoCicloEscolar,
  );
  await fastify.delete(
    '/:cicloEscolarId',
    {
      schema: deleteCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.deleteCicloEscolar,
  );
  await fastify.patch(
    '/:cicloEscolarId',
    {
      schema: updateCicloEscolarSchema,
      onRequest: [fastify.authenticate],
    },
    ciclosEscolaresAdapter.updateCicloEscolar,
  );

  next();
}

module.exports = cicloEscolarRouter;
