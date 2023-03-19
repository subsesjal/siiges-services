const { docentesAdapter } = require('../../adapters');
const { createDocenteSchema, findOneDocenteSchema } = require('./schema');

async function docenteRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createDocenteSchema },
    docentesAdapter.createDocente,
  );

  await fastify.get(
    '/:docenteId',
    { schema: findOneDocenteSchema },
    docentesAdapter.findOneDocente,
  );
  next();
}

module.exports = docenteRouter;
