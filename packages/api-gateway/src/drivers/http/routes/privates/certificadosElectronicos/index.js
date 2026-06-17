const { certificadosAdapter } = require('../../../adapters');

const {
  findAllCertificadosSchema,
} = require('./schema');

async function certificadosElectronicosRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllCertificadosSchema,
      onRequest: [fastify.authenticate],
    },
    certificadosAdapter.findAllCertificados,
  );

  next();
}

module.exports = certificadosElectronicosRouter;
