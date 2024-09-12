const { trayectoriasAdapter } = require('../../../adapters');
const {
  createTrayectoriaProgramaSchema,
  findOneTrayectoriaProgramaSchema,
  updateTrayectoriaProgramaSchema,
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

  await fastify.patch(
    '/:trayectoriaId',
    { schema: updateTrayectoriaProgramaSchema },
    trayectoriasAdapter.updateTrayectoriaPrograma,
  );

  next();
}

module.exports = trayectoriaRouter;
