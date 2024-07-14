const { solicitudesFoliosAdapter } = require('../../adapters');
const {
  createSolicitudFolioSchema,
} = require('./schema');

async function trayectoriaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createSolicitudFolioSchema },
    solicitudesFoliosAdapter.createSolicitudFolio,
  );

  next();
}

module.exports = trayectoriaRouter;
