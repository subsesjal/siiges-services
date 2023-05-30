const PluginLoader = require('fastify-plugin');
const fastifyJwt = require('@fastify/jwt');
const { config } = require('../../../../config/environment');

const myCustomMessages = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  noAuthorizationInHeaderMessage: 'Autorization token header[Bearer] is missing!',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  authorizationTokenUntrusted: 'Untrusted authorization token',
  authorizationTokenUnsigned: 'Unsigned authorization token',
  authorizationTokenInvalid: (err) => `Authorization token is invalid: ${err.message}`,
};

const jwtVerifyPlugin = async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: config.authJwtSecret,
    messages: myCustomMessages,
    sign: {
      expiresIn: config.expToken,
    },
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};

module.exports = PluginLoader(jwtVerifyPlugin);
