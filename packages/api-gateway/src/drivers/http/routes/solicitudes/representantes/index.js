const { representativeAdapter } = require('../../../adapters');

// const {
//   updateUsuarioSchema,
//   deleteUsuarioSchema,
// } = require('./schema');

async function usuarioRouter(fastify, _, next) {
  await fastify.post(
    '/',
    representativeAdapter.create,
  );

  next();
}

module.exports = usuarioRouter;
