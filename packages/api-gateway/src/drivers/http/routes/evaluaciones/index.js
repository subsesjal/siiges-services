const { solicitudesAdapter } = require('../../adapters');

const {
  createEvaluacionesSchema,
  findOneEvaluacionesSchema,
  updateEvaluacionesSchema,
} = require('./schema');

async function docenteRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createEvaluacionesSchema },
    solicitudesAdapter.createEvaluaciones,
  );

  await fastify.get(
    '/:evaluacionId',
    { schema: findOneEvaluacionesSchema },
    solicitudesAdapter.findOneEvaluaciones,
  );

  await fastify.patch(
    '/:evaluacionId',
    { schema: updateEvaluacionesSchema },
    solicitudesAdapter.updateEvaluaciones,
  );

  next();
}

module.exports = docenteRouter;
