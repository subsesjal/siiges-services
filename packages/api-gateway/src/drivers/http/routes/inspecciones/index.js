const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
  createInspeccionPreguntasSchema,
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

  await fastify.post(
    '/preguntas',
    {
      schema: createInspeccionPreguntasSchema,
    },
    inspeccionesAdapter.createInspeccionPreguntas,
  );

  next();
}

module.exports = inspeccionRouter;
