const { higieneAdapter } = require('../../adapters');

const {
  createHigieneSchema,
} = require('./schema');

async function higieneRouter(fastify, opts, next) {
  await fastify.post(

    '/planteles/:plantelId/higiene/higieneId',
    {
      schema: createHigieneSchema,
    },
    higieneAdapter.createhigiene,
  );

  next();
}

module.exports = higieneRouter;
