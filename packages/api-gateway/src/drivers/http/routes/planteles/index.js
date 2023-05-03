const { plantelesAdapter } = require('../../adapters');

const {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
  findAllHigienesSchema,
  findGroupPlantelHigieneSchema,
  createPlantelInfraestructuraSchema,
  deletePlantelInfraestructuraSchema,
  findGroupPlantelInfraestructuraSchema,
  findGroupPlantelesUsuarioSchema,
} = require('./schema');

async function plantelRouter(fastify, opts, next) {
  await fastify.get(
    '/higienes',
    {
      schema: findAllHigienesSchema,
    },
    plantelesAdapter.findAllHigienes,
  );

  await fastify.get(
    '/:plantelId/higienes',
    { schema: findGroupPlantelHigieneSchema },
    plantelesAdapter.findGroupPlantelHigiene,
  );
  await fastify.get(
    '/:plantelId/infraestructuras',
    {
      schema: findGroupPlantelInfraestructuraSchema,
    },
    plantelesAdapter.findGroupPlantelInfraestructura,
  );

  await fastify.get(
    '/usuarios/:usuarioId',
    { schema: findGroupPlantelesUsuarioSchema },
    plantelesAdapter.findGroupPlantelesUsuario,
  );

  await fastify.post(
    '/:plantelId/higienes/:higieneId',
    { schema: createUpdatePlantelHigieneSchema },
    plantelesAdapter.createPlantelHigiene,
  );

  await fastify.post(
    '/:plantelId/infraestructuras',
    { schema: createPlantelInfraestructuraSchema },
    plantelesAdapter.createPlantelInfraestructura,
  );

  await fastify.delete(
    '/:plantelId/infraestructuras/:id',
    { schema: deletePlantelInfraestructuraSchema },
    plantelesAdapter.deletePlantelInfraestructura,
  );

  await fastify.patch(
    '/:plantelId/higienes/:higieneId',
    { schema: createUpdatePlantelHigieneSchema },
    plantelesAdapter.updatePlantelHigiene,
  );

  await fastify.delete(
    '/:plantelId/higienes/:higieneId',
    { schema: deletePlantelHigieneSchema },
    plantelesAdapter.deletePlantelHigiene,
  );

  next();
}

module.exports = plantelRouter;
