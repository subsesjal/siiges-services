const { asignaturasAdapter } = require('../../adapters');
const { createAsignaturaSchema, findOneAsignaturaSchema, deleteAsignaturaSchema } = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createAsignaturaSchema },
    asignaturasAdapter.createAsignaturaPrograma,
  );

  await fastify.get(
    '/:asignaturaId',
    { schema: findOneAsignaturaSchema },
    asignaturasAdapter.findOneAsignaturaPrograma,
  );

  await fastify.delete(
    '/:asignaturaId',
    { schema: deleteAsignaturaSchema },
    asignaturasAdapter.deleteAsignaturaPrograma,
  );
  next();
}

module.exports = asignaturaRouter;
