const { inspeccionesAdapter } = require('../../adapters');

const {
  findAllInspeccionPreguntasSchema,
} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
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
