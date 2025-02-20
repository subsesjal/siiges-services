const { solicitudesServSocAdapter } = require('../../../adapters');
const solicitudServSocSchemas = require('./schema');

async function solicitudServSocRouter(fastify, opts, next) {
  // Solicitud ServSoc

  await fastify.post(
    '/',
    {
      schema: solicitudServSocSchemas.createSolicitudServSocSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.createSolicitudServSoc,
  );
  await fastify.get(
    '/:solicitudServicioSocialId',
    {
      schema: solicitudServSocSchemas.findOneSolicitudServSocSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.findOneSolicitudServSoc,
  );
  await fastify.get(
    '/',
    {
      schema: solicitudServSocSchemas.findAllSolicitudesServSocSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.findAllSolicitudesServSoc,
  );

  next();
}

module.exports = solicitudServSocRouter;
