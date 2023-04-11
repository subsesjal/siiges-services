const { plantelesAdapter } = require('../../adapters');

const {
  createPlantelHigieneSchema,
} = require('./schema');

async function plantelRouter(fastify, opts, next) {
  await fastify.post(

    '/:plantelId/higienes/:higieneId',
    {
      schema: createPlantelHigieneSchema,
    },
    plantelesAdapter.createPlantelHigiene,
  );

  next();
}

module.exports = plantelRouter;
