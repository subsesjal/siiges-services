const { solicitudesAdapter } = require('../../adapters');

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

  next();
}

module.exports = solicitudRouter;
