const { AsignaturaAdapter } = require('../../adapters');
const { findOneAsignaturaSchema } = require('./schema/find-one.asignatura.schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.get(
    '/:asignaturaId',
    {
      schema: findOneAsignaturaSchema,
    },
    AsignaturaAdapter.findOneAsignatura,
  );
  next();
}

module.exports = asignaturaRouter;
