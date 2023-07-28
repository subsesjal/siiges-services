const { trayectoriasAdapter } = require('../../adapters');
const {
  createTrayectoriaProgramaSchema,
} = require('./schema');

async function trayectoriaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createTrayectoriaProgramaSchema },
    trayectoriasAdapter.createTrayectoriaPrograma,
  );

  next();
}

module.exports = trayectoriaRouter;
