const { titulosAdapter } = require('../../../adapters');

const {
  findAllTitulos,
} = require('./schema');

async function titulosElectronicosRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllTitulos,
      onRequest: [fastify.authenticate],
    },
    titulosAdapter.findAll,
  );

  next();
}

module.exports = titulosElectronicosRouter;
