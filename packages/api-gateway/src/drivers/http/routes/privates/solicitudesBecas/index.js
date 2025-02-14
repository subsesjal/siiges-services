const { solicitudesBecasAdapter } = require('../../../adapters');
const solicitudSchemas = require('./schema');

async function solicitudBecaRouter(fastify, opts, next) {
  // Solicitud Beca

  await fastify.post(
    '/',
    {
      schema: solicitudSchemas.createSolicitudBecaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.createSolicitudBeca,
  );

  await fastify.get(
    '/',
    {
      schema: solicitudSchemas.findAllSolicitudesBecaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.findAllSolicitudBeca,
  );

  next();
}

module.exports = solicitudBecaRouter;
