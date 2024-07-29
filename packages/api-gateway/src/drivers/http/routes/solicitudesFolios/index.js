const { solicitudesFoliosAdapter } = require('../../adapters');
const {
  createSolicitudFolioSchema,
  findOneSolicitudFolioSchema,
  findAllSolicitudesFoliosSchema,
  createAlumnoFolioSchema,
  findOneAlumnoSchema,
  udpateSolicitudFolioSchema,
} = require('./schema');

async function trayectoriaRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllSolicitudesFoliosSchema },
    solicitudesFoliosAdapter.findAllSolicitudesFolios,
  );

  await fastify.get(
    '/:solicitudFolioId',
    { schema: findOneSolicitudFolioSchema },
    solicitudesFoliosAdapter.findOneSolicitudFolio,
  );

  await fastify.get(
    '/solicitudesFoliosAlumnos/:solicitudFolioAlumnoId',
    { schema: findOneAlumnoSchema },
    solicitudesFoliosAdapter.findOneSolicitudFolioAlumno,
  );

  await fastify.post(
    '/',
    { schema: createSolicitudFolioSchema },
    solicitudesFoliosAdapter.createSolicitudFolio,
  );

  await fastify.post(
    '/:solicitudFolioId/alumnos/:alumnoId',
    { schema: createAlumnoFolioSchema },
    solicitudesFoliosAdapter.createAlumnoFolio,
  );

  await fastify.patch(
    '/:solicitudFolioId',
    { schema: udpateSolicitudFolioSchema },
    solicitudesFoliosAdapter.updateSolicitudFolio,
  );

  next();
}

module.exports = trayectoriaRouter;
