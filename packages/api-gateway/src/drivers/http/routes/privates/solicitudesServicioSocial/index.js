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
  await fastify.patch(
    '/:solicitudServicioSocialId',
    {
      schema: solicitudServSocSchemas.updateSolicitudServSocSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.updateSolicitudServSoc,
  );
  await fastify.post(
    '/:solicitudServicioSocialId/solicitudesServicioSocialAlumno',
    {
      schema: solicitudServSocSchemas.createSolicitudServSocAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.createSolicitudServSocAlumno,
  );
  await fastify.get(
    '/:solicitudServicioSocialId/solicitudesServicioSocialAlumno/:solicitudesServicioSocialAlumnosId',
    {
      schema: solicitudServSocSchemas.findOneSolicitudServSocAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.findOneSolicitudServSocAlumno,
  );
  await fastify.get(
    '/:solicitudServicioSocialId/solicitudesServicioSocialAlumno',
    {
      schema: solicitudServSocSchemas.findAllSolicitudesServSocAlumnosSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.findAllSolicitudesServSocAlumno,
  );

  await fastify.delete(
    '/:solicitudServicioSocialId',
    {
      schema: solicitudServSocSchemas.deleteSolicitudServSocSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesServSocAdapter.deleteSolicitudServSoc,
  );

  next();
}

module.exports = solicitudServSocRouter;
