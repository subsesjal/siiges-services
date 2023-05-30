// External dependencies
// Internal dependencies
const { authAdapter } = require('../../adapters');

async function authRouter(fastify, _, next) {
  await fastify.post(
    '/login',
    authAdapter.loginUser,
  );

  next();
}

module.exports = authRouter;
