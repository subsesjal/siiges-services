const { trayectoriasAdapter } = require('../../adapters');
const {
  createTrayectoriaProgramaSchema,
  findOneTrayectoriaProgramaSchema,
} = require('./schema');

async function trayectoriaRouter(fastify, opts, next) {
  await fastify.get(
    '/programas/:programaId',
    { schema: findOneTrayectoriaProgramaSchema },
    trayectoriasAdapter.findOneTrayectoriaPrograma,
  );

  await fastify.post(
    '/',
    { schema: createTrayectoriaProgramaSchema },
    trayectoriasAdapter.createTrayectoriaPrograma,
  );

  next();
}

module.exports = trayectoriaRouter;
