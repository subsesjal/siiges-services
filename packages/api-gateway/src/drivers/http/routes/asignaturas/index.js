const { asignaturasAdapter } = require('../../adapters');
const {
  createAsignaturaSchema,
  findOneAsignaturaSchema,
  updateAsignaturasSchema,
} = require('./schema');

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
  await fastify.patch(
    '/:asignaturaId',
    { schema: updateAsignaturasSchema },
    asignaturasAdapter.updateAsignaturas,
  );

  next();
}

module.exports = asignaturaRouter;
