const { orgColegiadosAdapter } = require('../../../adapters');

const {
  createOrgColegiadoSchema,
  findOneOrgColegiadoSchema,
  findGroupOrgColegiadosSchema,
  updateOrgColegiadoSchema,
} = require('./schema');

async function orgColegiadosRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createOrgColegiadoSchema,
      onRequest: [fastify.authenticate],
    },
    orgColegiadosAdapter.createOrgColegiado,
  );

  await fastify.get(
    '/:orgColegiadoId',
    {
      schema: findOneOrgColegiadoSchema,
      onRequest: [fastify.authenticate],
    },
    orgColegiadosAdapter.findOneOrgColegiado,
  );

  await fastify.get(
    '/instituciones/:institucionId',
    {
      schema: findGroupOrgColegiadosSchema,
      onRequest: [fastify.authenticate],
    },
    orgColegiadosAdapter.findGroupOrgColegiados,
  );

  await fastify.patch(
    '/:orgColegiadoId',
    {
      schema: updateOrgColegiadoSchema,
      onRequest: [fastify.authenticate],
    },
    orgColegiadosAdapter.updateOrgColegiado,
  );

  next();
}

module.exports = orgColegiadosRouter;
