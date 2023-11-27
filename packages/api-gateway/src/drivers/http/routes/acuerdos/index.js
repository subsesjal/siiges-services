const { acuerdosAdapter } = require('../../adapters');

const {
  createAcuerdoSchema,
  findOneAcuerdoSchema,
  findGroupAcuerdosSchema,
  updateAcuerdoSchema,
} = require('./schema');

async function acuerdosRouter(fastify, opts, next) {
  await fastify.post(
    '/orgColegiados/:organoColegiadoId',
    {
      schema: createAcuerdoSchema,
      onRequest: [fastify.authenticate],
    },
    acuerdosAdapter.createAcuerdo,
  );

  await fastify.get(
    '/:acuerdoId',
    {
      schema: findOneAcuerdoSchema,
      onRequest: [fastify.authenticate],
    },
    acuerdosAdapter.findOneAcuerdo,
  );

  await fastify.get(
    '/orgColegiados/:organoColegiadoId',
    {
      schema: findGroupAcuerdosSchema,
      onRequest: [fastify.authenticate],
    },
    acuerdosAdapter.findGroupAcuerdos,
  );

  await fastify.patch(
    '/:acuerdoId',
    {
      schema: updateAcuerdoSchema,
      onRequest: [fastify.authenticate],
    },
    acuerdosAdapter.updateAcuerdo,
  );

  next();
}

module.exports = acuerdosRouter;
