// External dependencies
// Internal dependencies
const { authAdapter, usuariosAdapter } = require('../../../adapters');
const schema = require('./schema');

async function authRouter(fastify, _, next) {
  await fastify.post(
    '/login',
    { schema: schema.loginSchema },
    authAdapter.loginUser,
  );

  await fastify.post(
    '/register',
    { schema: schema.registerSchema },
    usuariosAdapter.register,
  );

  await fastify.post(
    '/tokenRecoveryPassword',
    { schema: schema.tokenRecoveryPasswordSchema },
    authAdapter.tokenRecoveryPassword,
  );

  await fastify.post(
    '/newPassword',
    { schema: schema.changePasswordByMailSchema },
    authAdapter.changePassword,
  );

  await fastify.post(
    '/newPasswordToken',
    { schema: schema.changePasswordByUserIdSchema },
    authAdapter.changePassword,
  );

  next();
}

module.exports = authRouter;
