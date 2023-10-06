const { gruposAdapter } = require('../../adapters');

const {
  createGrupoSchema,
  deleteGrupoSchema,
  findGroupGrupoSchema,
  findOneGrupoSchema,
  updateGrupoSchema,
} = require('./schema');

async function grupoRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createGrupoSchema,
      onRequest: [fastify.authenticate],
    },
    gruposAdapter.createGrupo,
  );
  await fastify.get(
    '/:grupoId',
    {
      schema: findOneGrupoSchema,
      onRequest: [fastify.authenticate],
    },
    gruposAdapter.findOneGrupo,
  );
  await fastify.get(
    '/ciclosEscolares/:cicloEscolarId',
    {
      schema: findGroupGrupoSchema,
      onRequest: [fastify.authenticate],
    },
    gruposAdapter.findGroupGrupo,
  );
  await fastify.delete(
    '/:grupoId',
    {
      schema: deleteGrupoSchema,
      onRequest: [fastify.authenticate],
    },
    gruposAdapter.deleteGrupo,
  );
  await fastify.patch(
    '/:grupoId',
    {
      schema: updateGrupoSchema,
      onRequest: [fastify.authenticate],
    },
    gruposAdapter.updateGrupo,
  );

  next();
}

module.exports = grupoRouter;
