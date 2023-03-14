const { solicitudesAdapter, representativeAdapter, diligenceAdapter } = require('../../adapters');
const { updateSchema, findSchema, deleteSchema } = require('./representantes/schemas');
const { findGroupSchema } = require('./diligencias/schema');
const {
  createSolicitudProgramaSchema,
  findAllSolicitudesProgramasSchema,
  findOneSolicitudProgramaSchema,
  findAllSolicitudesUsuarioSchema,
  updateSolicitudProgramaSchema,
} = require('./schema');

async function solicitudRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllSolicitudesProgramasSchema },
    solicitudesAdapter.findAllSolicitudesProgramas,
  );

  await fastify.get(
    '/:solicitudId',
    { schema: findOneSolicitudProgramaSchema },
    solicitudesAdapter.findOneSolicitudPrograma,
  );

  await fastify.post(
    '/',
    { schema: createSolicitudProgramaSchema },
    solicitudesAdapter.createSolicitudPrograma,
  );

  await fastify.patch(
    '/:solicitudId',
    { schema: updateSolicitudProgramaSchema },
    solicitudesAdapter.updateSolicitudPrograma,
  );

  await fastify.get(
    '/:solicitudId/representantes/:usuarioId',
    { schema: findSchema },
    representativeAdapter.findOne,
  );

  await fastify.patch(
    '/:solicitudId/representantes/:usuarioId',
    { schema: updateSchema },
    representativeAdapter.update,
  );

  await fastify.delete(
    '/:solicitudId/representantes/:usuarioId',
    { schema: deleteSchema },
    representativeAdapter.deleteOne,
  );

  await fastify.get(
    '/:solicitudId/diligencias/',
    { schema: findGroupSchema },
    diligenceAdapter.findGroup,
  );

  await fastify.get(
    '/usuarios/:usuarioId',
    { schema: findAllSolicitudesUsuarioSchema },
    solicitudesAdapter.findSolicitudesUsuario,
  );

  next();
}

module.exports = solicitudRouter;
