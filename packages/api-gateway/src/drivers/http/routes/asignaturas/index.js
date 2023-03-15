const { asignaturasAdapter } = require('../../adapters');
const { createAsignaturaSchema, findOneAsignaturaSchema, findProgramaAsignaturaSchema } = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createAsignaturaSchema },
    asignaturasAdapter.createAsignaturaPrograma,
  );

  await fastify.get(
    '/programas/:programaId',
    { schema: findProgramaAsignaturaSchema },
    asignaturasAdapter.findProgramaAsignatura,
  );

  await fastify.get(
    '/:asignaturaId',
    { schema: findOneAsignaturaSchema },
    asignaturasAdapter.findOneAsignaturaPrograma,
  );
  next();
}

module.exports = asignaturaRouter;
