// External dependencies
const { Authenticator } = require('@fastify/passport');
const fastifySecureSession = require('@fastify/secure-session');
const fs = require('fs');
const path = require('path');
// Internal dependencies
const { LocalStrategy } = require('@siiges-services/authentication');
const { authAdapter } = require('../../adapters');

const userPassport = new Authenticator({ key: 'users', userProperty: 'user' });
userPassport.use(LocalStrategy);

async function authRouter(fastify, _, next) {
  fastify.register(fastifySecureSession, { key: fs.readFileSync(path.join(__dirname, 'secret-key')) });
  fastify.register(userPassport.initialize());
  fastify.register(userPassport.secureSession());
  userPassport.use(LocalStrategy);

  await fastify.post(
    '/login',
    { preValidation: userPassport.authenticate('local', { session: false }) },
    authAdapter.loginUser,
  );

  next();
}

module.exports = authRouter;
