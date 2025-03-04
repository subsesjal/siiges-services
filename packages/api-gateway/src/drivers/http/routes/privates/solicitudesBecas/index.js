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

  await fastify.patch(
    '/:solicitudBecaId',
    {
      schema: solicitudSchemas.updateSolicitudBecaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.updateSolicitudBeca,
  );

  await fastify.get(
    '/',
    {
      schema: solicitudSchemas.findAllSolicitudesBecasSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.findAllSolicitudesBecas,
  );

  await fastify.get(
    '/:solicitudBecaId',
    {
      schema: solicitudSchemas.findOneSolicitudBecaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.findOneSolicitudBeca,
  );

  await fastify.delete(
    '/:solicitudBecaId',
    {
      schema: solicitudSchemas.findOneSolicitudBecaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.deleteSolicitudBeca,
  );

  await fastify.post(
    '/:solicitudBecaId/solicitudesBecasAlumnos',
    {
    // schema: solicitudSchemas.createSolicitudBecaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesBecasAdapter.createSolicitudBecaAlumno,
  );

  next();
}

module.exports = solicitudBecaRouter;
