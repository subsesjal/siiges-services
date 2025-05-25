// External dependencies
// Internal dependencies
const { authAdapter } = require('../../../adapters');
const schema = require('./schema');

async function authRouter(fastify, _, next) {
  await fastify.post(
    '/login',
    { schema: schema.loginSchema },
    authAdapter.loginUser,
  );

  next();
}

module.exports = authRouter;
