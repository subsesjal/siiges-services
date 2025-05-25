const PluginLoader = require('fastify-plugin');
const fastifyJwt = require('@fastify/jwt');
const { config } = require('../../../../config/environment');

const myCustomMessages = {
  badRequestErrorMessage: 'El formato debe ser: Authorization: Bearer [token]',
  noAuthorizationInHeaderMessage: '¡Falta el encabezado de autorización [Bearer]!',
  authorizationTokenExpiredMessage: 'El token de autorización ha expirado',
  authorizationTokenUntrusted: 'El token de autorización no es confiable',
  authorizationTokenUnsigned: 'El token de autorización no está firmado',
  authorizationTokenInvalid: (err) => `El token de autorización no es válido: ${err.message}`,
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
