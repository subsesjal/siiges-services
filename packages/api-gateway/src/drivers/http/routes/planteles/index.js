const { plantelesAdapter } = require('../../adapters');

const {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
  findGroupPlantelHigieneSchema,
  createPlantelInfraestructuraSchema,
  findGroupPlantelesUsuarioSchema,
} = require('./schema');

async function plantelRouter(fastify, opts, next) {
  await fastify.get(
    '/:plantelId/higienes',
    { schema: findGroupPlantelHigieneSchema },
    plantelesAdapter.findGroupPlantelHigiene,
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
