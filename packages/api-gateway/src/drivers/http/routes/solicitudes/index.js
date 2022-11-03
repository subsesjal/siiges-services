const { solicitudesAdapter, diligenceAdapter } = require('../../adapters');
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

  next();
}

module.exports = solicitudRouter;
