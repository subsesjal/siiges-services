const { asignaturasAdapter } = require('../../adapters');
const {
  createAsignaturaSchema,
  findOneAsignaturaSchema,
  updateAsignaturaSchema,
  findProgramaAsignaturasSchema,
  deleteAsignaturaSchema,
} = require('./schema');

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

  await fastify.patch(
    '/:asignaturaId',
    { schema: updateAsignaturaSchema },
    asignaturasAdapter.updateAsignatura,
  );

  await fastify.delete(
    '/:asignaturaId',
    { schema: deleteAsignaturaSchema },
    asignaturasAdapter.deleteAsignaturaPrograma,
  );

  next();
}

module.exports = asignaturaRouter;
