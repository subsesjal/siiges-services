const { asignaturasAdapter } = require('../../adapters');
const { createAsignaturaSchema } = require('./schema');
const { findOneAsignaturaSchema } = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createAsignaturaSchema },
    asignaturasAdapter.createAsignaturaPrograma,
  );

  await fastify.get(
    '/:asignaturaId/asignaturas',
    {
      schema: findOneAsignaturaSchema,
    },
  );

  next();
}

module.exports = asignaturaRouter;
