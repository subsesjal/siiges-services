const { plantelesAdapter } = require('../../adapters');

const {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
} = require('./schema');

async function plantelRouter(fastify, opts, next) {
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
