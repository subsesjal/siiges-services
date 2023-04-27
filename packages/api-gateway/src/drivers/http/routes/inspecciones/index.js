const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionPreguntasSchema,
} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/:inspeccionId',
    {
      schema: createInspeccionPreguntasSchema,
    },
    inspeccionesAdapter.createInspeccionPreguntas,
  );

  next();
}

module.exports = inspeccionRouter;
