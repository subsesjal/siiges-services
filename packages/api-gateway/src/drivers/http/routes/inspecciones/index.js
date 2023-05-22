const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
  findAllInspeccionPreguntasSchema,
  createInspeccionRespuestasSchema,
  deleteInspeccionSchema,
} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createInspeccionSchema },
    inspeccionesAdapter.createInspeccion,
  );
  await fastify.post(
    '/:inspeccionId/preguntas',
    { schema: createInspeccionRespuestasSchema },
    inspeccionesAdapter.createInspeccionRespuestas,
  );
  await fastify.get(
    '/preguntas',
    { schema: findAllInspeccionPreguntasSchema },
    inspeccionesAdapter.findAllInspeccionPreguntas,
  );
  await fastify.delete(
    '/:inspeccionId',
    { schema: deleteInspeccionSchema },
    inspeccionesAdapter.deleteInspeccion,
  );

  next();
}

module.exports = inspeccionRouter;
