const { solicitudesAdapter } = require('../../adapters');

const {
  createEvaluacionesSchema,
  findOneEvaluacionesSchema,
  updateEvaluacionesSchema,
} = require('./schema');

async function evaluacionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createEvaluacionesSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.createEvaluaciones,
  );

  await fastify.get(
    '/:evaluacionId',
    {
      schema: findOneEvaluacionesSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findOneEvaluaciones,
  );

  await fastify.patch(
    '/:evaluacionId',
    {
      schema: updateEvaluacionesSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.updateEvaluaciones,
  );

  next();
}

module.exports = evaluacionRouter;
