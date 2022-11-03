const { diligenceAdapter, solicitudesAdapter, representativeAdapter } = require('../../adapters');
const { findGroupSchema } = require('./diligencias/schema');
const {
  createSolicitudProgramaSchema,
} = require('./schema');

async function solicitudRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createSolicitudProgramaSchema,
    },
    solicitudesAdapter.createSolicitudPrograma,
  );

  await fastify.get(
    '/:solicitudId/diligencia/',
    { schema: findGroupSchema },
    diligenceAdapter.findGroup,
  );

  await fastify.get(
    '/:solicitudId/representantes/:usuarioId',
    representativeAdapter.findOne,
  );

  await fastify.patch(
    '/:solicitudId/representantes/:usuarioId',
    representativeAdapter.update,
  );

  await fastify.delete(
    '/:solicitudId/representantes/:usuarioId',
    representativeAdapter.deleteOne,
  );

  next();
}

module.exports = solicitudRouter;
