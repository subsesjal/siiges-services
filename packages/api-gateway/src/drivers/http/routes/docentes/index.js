const { docentesAdapter } = require('../../adapters');
const { createDocenteSchema, findOneDocenteSchema, updateDocenteSchema } = require('./schema');

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
  await fastify.patch(
    '/:docenteId',
    { schema: updateDocenteSchema },
    docentesAdapter.updateDocente,
  );

  next();
}

module.exports = docenteRouter;
