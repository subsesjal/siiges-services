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

  next();
}

module.exports = solicitudServSocRouter;
