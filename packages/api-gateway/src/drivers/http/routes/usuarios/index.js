const { usuariosAdapter } = require('../../adapters');
const { getUsuarioSchema, createUsuarioSchema } = require('./schema');

async function usuarioRouter(fastify) {
  await fastify.get('/', usuariosAdapter.findAll);
  await fastify.get(
    '/:usuarioId',
    { schema: getUsuarioSchema },
    usuariosAdapter.findOne,
  );
  await fastify.post(
    '/',
    { schema: createUsuarioSchema },
    usuariosAdapter.create,
  );
}

module.exports = usuarioRouter;
