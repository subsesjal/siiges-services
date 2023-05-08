const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
  findAllInspeccionPreguntasSchema,
} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createInspeccionSchema },
    inspeccionesAdapter.createInspeccion,
  );

  await fastify.get(
    '/preguntas',
    {
      schema: findAllInspeccionPreguntasSchema,
    },
    inspeccionesAdapter.findAllInspeccionPreguntas,
  );

  next();
}

module.exports = inspeccionRouter;
