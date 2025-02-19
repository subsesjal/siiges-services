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
    solicitudesBecasAdapter.findAllSolicitudesBeca,
  );

  await fastify.get(
    '/:solicitudBecaId',
    {
      schema: solicitudSchemas.findOneSolicitudBecaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.findOneSolicitudBeca,
  );

  next();
}

module.exports = solicitudBecaRouter;
