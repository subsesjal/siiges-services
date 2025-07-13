const { solicitudesFoliosAdapter } = require('../../../adapters');
const solicitudSchemas = require('./schema');

async function trayectoriaRouter(fastify, opts, next) {
  // Solicitud Folios

  await fastify.get(
    '/',
    {
      schema: solicitudSchemas.findAllSolicitudesFoliosSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.findAllSolicitudesFolios,
  );

  await fastify.get(
    '/:solicitudFolioId',
    {
      schema: solicitudSchemas.findOneSolicitudFolioSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.findOneSolicitudFolio,
  );

  await fastify.post(
    '/',
    {
      schema: solicitudSchemas.createSolicitudFolioSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.createSolicitudFolio,
  );

  await fastify.patch(
    '/:solicitudFolioId',
    {
      schema: solicitudSchemas.udpateSolicitudFolioSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.updateSolicitudFolio,
  );

  await fastify.post(
    '/:solicitudFolioId/observaciones',
    {
      schema: solicitudSchemas.udpateSolicitudFolioSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.updateObservaciones,
  );

  // Solicitud Folio Alumno
  await fastify.get(
    '/solicitudesFoliosAlumnos/:solicitudFolioAlumnoId',
    {
      schema: solicitudSchemas.findOneSolicitudFolioAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.findOneSolicitudFolioAlumno,
  );

  await fastify.post(
    '/:solicitudFolioId/alumnos/:alumnoId',
    {
      schema: solicitudSchemas.createSolicitudFolioAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.createSolicitudFolioAlumno,
  );

  await fastify.patch(
    '/solicitudesFoliosAlumnos/:solicitudFolioAlumnoId',
    {
      schema: solicitudSchemas.updateSolicitudFolioAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.updateSolicitudFolioAlumno,
  );

  await fastify.get(
    '/:solicitudFolioId/alumnos',
    {
      schema: solicitudSchemas.findAllSolicitudFolioAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.findAllSolicitudFolioAlumnos,
  );

  await fastify.delete(
    '/solicitudesFoliosAlumnos/:solicitudFolioAlumnoId',
    {
      schema: solicitudSchemas.deleteSolicitudFolioAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.deleteSolicitudFolioAlumno,
  );

  await fastify.post(
    '/:solicitudFolioId/asignacionFolios',
    {
      schema: solicitudSchemas.assignFoliosAlumnosSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.asignacionFolioAlumno,
  );

  await fastify.post(
    '/:solicitudFolioId/envioTitulacion',
    {
      schema: solicitudSchemas.sendAppTitulacion,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.envioTitulacion,
  );

  await fastify.get(
    '/reporteFolios',
    {
      schema: solicitudSchemas.reportSolicitudFolioAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesFoliosAdapter.reportFolioDocumentoAlumno,
  );

  next();
}

module.exports = trayectoriaRouter;
