const { solicitudesAdapter, representativeAdapter, diligenciasAdapter } = require('../../adapters');
const { updateSchema, findSchema, deleteSchema } = require('./representantes/schemas');
const { findDiligenciasSolicitudSchema } = require('../diligencias/schema');
const {
  createSolicitudProgramaSchema,
  createSolicitudRefrendoSchema,
  findAllSolicitudesProgramasSchema,
  findOneSolicitudProgramaSchema,
  findAllSolicitudesUsuarioSchema,
  updateSolicitudProgramaSchema,
  setSolicitudSeccionSchema,
  findOneSolicitudSeccionSchema,
  updateSolcitudSeccionObservacionSchema,
  findOneSolicitudDetalleSchema,
} = require('./schema');

async function solicitudRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllSolicitudesProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findAllSolicitudesProgramas,
  );

  await fastify.get(
    '/:solicitudId',
    {
      schema: findOneSolicitudProgramaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findOneSolicitudPrograma,
  );

  await fastify.get(
    '/:solicitudId/detalles',
    {
      schema: findOneSolicitudDetalleSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findOneSolicitudDetalle,
  );

  await fastify.post(
    '/:solicitudId/refrendo',
    {
      // schema: createSolicitudRefrendoSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.createSolicitudPrograma,
  );

  await fastify.post(
    '/',
    {
      schema: createSolicitudProgramaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.createSolicitudPrograma,
  );

  await fastify.patch(
    '/:solicitudId',
    {
      schema: updateSolicitudProgramaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.updateSolicitudPrograma,
  );

  await fastify.get(
    '/:solicitudId/representantes/:usuarioId',
    {
      schema: findSchema,
      onRequest: [fastify.authenticate],
    },
    representativeAdapter.findOne,
  );

  await fastify.patch(
    '/:solicitudId/representantes/:usuarioId',
    {
      schema: updateSchema,
      onRequest: [fastify.authenticate],
    },
    representativeAdapter.update,
  );

  await fastify.delete(
    '/:solicitudId/representantes/:usuarioId',
    {
      schema: deleteSchema,
      onRequest: [fastify.authenticate],
    },
    representativeAdapter.deleteOne,
  );

  await fastify.get(
    '/:solicitudId/diligencias/',
    {
      schema: findDiligenciasSolicitudSchema,
      onRequest: [fastify.authenticate],
    },
    diligenciasAdapter.findDiligenciasBySolicitud,
  );

  await fastify.post(
    '/:solicitudId/secciones/:seccionId',
    {
      schema: setSolicitudSeccionSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.setSolicitudSeccion,
  );

  await fastify.post(
    '/:solicitudId/secciones/:seccionId/observaciones',
    {
      schema: updateSolcitudSeccionObservacionSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.updateSolcitudSeccionObservacion,
  );

  await fastify.get(
    '/:solicitudId/secciones/:seccionId',
    {
      schema: findOneSolicitudSeccionSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findOneSolicitudSeccion,
  );

  await fastify.get(
    '/usuarios/:usuarioId',
    {
      schema: findAllSolicitudesUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesAdapter.findSolicitudesUsuario,
  );

  next();
}

module.exports = solicitudRouter;
