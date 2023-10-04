const { solicitudesAdapter } = require('../../adapters');

const {
  createEvaluacionesSchema,
  findOneEvaluacionesSchema,
  findAllEvaluadoresSchema,
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

  await fastify.get(
    '/evaluadores',
    {
      schema: findAllEvaluadoresSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findAllEvaluadores,
  );

  next();
}

module.exports = evaluacionRouter;
