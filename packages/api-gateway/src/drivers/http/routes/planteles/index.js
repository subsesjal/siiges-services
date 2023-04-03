const { higieneAdapter } = require('../../adapters');

const {
  updateHigieneSchema,

} = require('./schema');

async function plantelesRouter(fastify, opts, next) {
  await fastify.patch(
    '/:plantelId/higiene/higieneid',
    {
      schema: updateHigieneSchema,
    },
    higieneAdapter.updateHigiene,
  );

  next();
}

module.exports = plantelesRouter;
