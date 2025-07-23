const PluginLoader = require('fastify-plugin');
const boom = require('@hapi/boom');
const fastifyJwt = require('@fastify/jwt');
const errorHandler = require('../utils/errorHandler');
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

  fastify.decorate('authorizeRole', (expectedRoles = []) => async (request, reply) => {
    try {
      await request.jwtVerify();
      const { rol, id } = request.user;

      if (!expectedRoles.includes(rol)) {
        throw boom.forbidden('No tienes permisos suficientes para acceder a este recurso.');
      }

      // Attach userId to request object so it can be accessed in the route handler
      request.userId = id;
    } catch (error) {
      errorHandler(error, reply);
    }
  });
};

module.exports = PluginLoader(jwtVerifyPlugin);
