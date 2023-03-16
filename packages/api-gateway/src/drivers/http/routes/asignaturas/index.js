const { asignaturasAdapter } = require('../../adapters');
const { createAsignaturaSchema, findOneAsignaturaSchema, findProgramaAsignaturasSchema } = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createAsignaturaSchema },
    asignaturasAdapter.createAsignaturaPrograma,
  );

  await fastify.get(
    '/programas/:programaId',
    { schema: findProgramaAsignaturasSchema },
    asignaturasAdapter.findProgramaAsignaturas,
  );

  await fastify.get(
    '/:asignaturaId',
    { schema: findOneAsignaturaSchema },
    asignaturasAdapter.findOneAsignaturaPrograma,
  );
  next();
}

module.exports = asignaturaRouter;
