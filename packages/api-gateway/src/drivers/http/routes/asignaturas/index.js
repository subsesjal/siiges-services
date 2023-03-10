const { asignaturasAdapter } = require('../../adapters');
const { createAsignaturaSchema } = require('./schema');
const { findOneAsignaturaSchema } = require('./schema');
const { findOneAsignaturaAdapter } = require('../../adapters');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createAsignaturaSchema },
    asignaturasAdapter.createAsignaturaPrograma,
  );

  await fastify.get(
    '/:asignaturaId/asignaturas',
    { schema: findOneAsignaturaSchema },
    findOneAsignaturaAdapter.findOneAsignatura,
  );
  next();
}

module.exports = asignaturaRouter;
