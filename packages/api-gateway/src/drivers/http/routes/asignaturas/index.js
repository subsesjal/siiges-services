const { asignaturasAdapter } = require('../../adapters');
const { createAsignaturaSchema, findOneAsignaturaSchema, findProgramaAsignaturaSchema } = require('./schema');

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
  next();

  await fastify.get(
    'programa/:asignaturaId',
    { schema: findProgramaAsignaturaSchema },
    asignaturasAdapter.findProgramaAsignatura,
  );
}

module.exports = asignaturaRouter;
