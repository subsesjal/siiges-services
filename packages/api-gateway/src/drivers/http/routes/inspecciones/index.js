const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
} = require('./schema');
const createInspeccionPreguntasSchema = require('./schema/create.inspeccion-preguntas.schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createInspeccionSchema },
    inspeccionesAdapter.createInspeccion,
  );

  await fastify.post(
    '/:inspeccionId',
    { schema: createInspeccionPreguntasSchema },
    inspeccionesAdapter.createInspeccionPreguntas,
  );

  next();
}

module.exports = inspeccionRouter;
