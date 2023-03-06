const { asignaturasAdapter } = require('../../adapters');
const { createAsignaturaSchema } = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createAsignaturaSchema },
    asignaturasAdapter.createAsignaturaPrograma,
  );

  next();
}

module.exports = asignaturaRouter;
