const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
  findAllInspeccionPreguntasSchema,
  createInspeccionRespuestasSchema,

} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createInspeccionSchema },
    inspeccionesAdapter.createInspeccion,
  );
  await fastify.post(
    '/inspeccion/preguntas',
    { schema: createInspeccionRespuestasSchema },
    inspeccionesAdapter.createInspeccionRespuestas,
  );
  await fastify.get(
    '/preguntas',
    { schema: findAllInspeccionPreguntasSchema },
    inspeccionesAdapter.findAllInspeccionPreguntas,
  );

  next();
}

module.exports = inspeccionRouter;
