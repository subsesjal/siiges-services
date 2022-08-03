const fp = require('fastify-plugin');
const swaggerUi = require('@fastify/swagger');
const swaggerDoc = require('../utils/swaggerConfig');

module.exports = fp(async (fastify, opts, next) => {
  fastify.register(swaggerUi, swaggerDoc);

  next();
});
