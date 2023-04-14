const { plantelesAdapter } = require('../../adapters');

const {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
  findAllHigienesSchema,
  findGroupPlantelHigieneSchema,

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
    {
      schema: findGroupPlantelHigieneSchema,
    },
    plantelesAdapter.findGroupPlantelHigiene,
  );

  await fastify.post(
    '/:plantelId/higienes/:higieneId',
    {
      schema: createUpdatePlantelHigieneSchema,
    },
    plantelesAdapter.createPlantelHigiene,
  );

  await fastify.patch(
    '/:plantelId/higienes/:higieneId',
    {
      schema: createUpdatePlantelHigieneSchema,
    },
    plantelesAdapter.updatePlantelHigiene,
  );

  await fastify.delete(
    '/:plantelId/higienes/:higieneId',
    {
      schema: deletePlantelHigieneSchema,
    },
    plantelesAdapter.deletePlantelHigiene,
  );

  next();
}

module.exports = plantelRouter;
