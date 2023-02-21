const { municipiosAdapter } = require('../../adapters');

const { findAllMunicipiosSchema } = require('./schema');

async function municipioRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllMunicipiosSchema },
    municipiosAdapter.findAllMunicipios,
  );

  next();
}

module.exports = municipioRouter;
