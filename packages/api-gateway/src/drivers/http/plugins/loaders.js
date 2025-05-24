const path = require('path');
const swaggerUi = require('@fastify/swagger');
const AutoLoad = require('@fastify/autoload'); // Automatically loads routes/plugins

const privateSwagger = require('../utils/swagger/private.config');
const publicSwagger = require('../utils/swagger/public.config');
const externalSwagger = require('../utils/swagger/external.config');

// Load public routes under the /api/v1/public prefix
const publicLoader = async (fastify) => {
  await fastify.register(async (publicScope) => {
    await publicScope.register(swaggerUi, publicSwagger);
    await publicScope.register(AutoLoad, {
      dir: path.join(__dirname, '../routes/publics'),
      ignorePattern: /.*(schema).*/,
      options: { prefix: 'api/v1/public' },
    });
  });
};

// Load private routes under the /api/v1 prefix
const privateLoader = async (fastify) => {
  await fastify.register(async (privateScope) => {
    await privateScope.register(swaggerUi, privateSwagger);
    await privateScope.register(AutoLoad, {
      dir: path.join(__dirname, '../routes/privates'),
      ignorePattern: /.*(schema).*/,
      options: { prefix: 'api/v1' },
    });
  });
};

// Load external routes under the /api/v1 prefix
const externalLoader = async (fastify) => {
  await fastify.register(async (privateScope) => {
    await privateScope.register(swaggerUi, externalSwagger);
    await privateScope.register(AutoLoad, {
      dir: path.join(__dirname, '../routes/external'),
      ignorePattern: /.*(schema).*/,
      options: { prefix: 'api/v2/external' },
    });
  });
};

module.exports = {
  publicLoader,
  privateLoader,
  externalLoader,
};
