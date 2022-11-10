const { solicitudesAdapter, representativeAdapter } = require('../../adapters');
const { updateSchema, findSchema, deleteSchema } = require('./representantes/schemas');
const { createSolicitudProgramaSchema } = require('./schema');

async function solicitudRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createSolicitudProgramaSchema,
    },
    solicitudesAdapter.createSolicitudPrograma,
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

  next();
}

module.exports = solicitudRouter;
