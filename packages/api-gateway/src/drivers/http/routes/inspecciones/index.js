const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
  createInspeccionInspeccionPreguntasSchema,
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
    '/inspeccion/preguntas',
    {
      schema: createInspeccionInspeccionPreguntasSchema,
    },
    inspeccionesAdapter.createInspeccionInspeccionPreguntas,
  );

  next();
}

module.exports = inspeccionRouter;
