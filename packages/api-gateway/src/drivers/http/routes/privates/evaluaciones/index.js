const { solicitudesAdapter } = require('../../../adapters');

const {
  createEvaluacionesSchema,
  findOneEvaluacionesSchema,
  findAllEvaluadoresSchema,
  updateEvaluacionesSchema,
  findCumplimientoSchema,
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

  await fastify.get(
    '/cumplimiento',
    {
      schema: findCumplimientoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findCumplimiento,
  );

  next();
}

module.exports = evaluacionRouter;
