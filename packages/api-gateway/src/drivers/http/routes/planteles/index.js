const { plantelesAdapter } = require('../../adapters');

const {
  createUpdatePlantelHigieneSchema,
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

  next();
}

module.exports = plantelRouter;
