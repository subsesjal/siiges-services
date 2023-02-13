const { municipiosAdapter } = require('../../adapters');

const { findAllMunicipiosSchema } = require('./schema');

const { deleteMunicipiosSchema } = require('./schema');

async function municipioRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllMunicipiosSchema },
    municipiosAdapter.findAllMunicipios,
  );

  await fastify.delete(
    '/:municipioId',
    { schema: deleteMunicipiosSchema },
    municipiosAdapter.deleteMunicipios,
  );

  next();
}

module.exports = municipioRouter;
