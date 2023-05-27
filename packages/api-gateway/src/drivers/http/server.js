// External dependencies
const Fastify = require('fastify');
const multer = require('fastify-multer');
const fastifyStatic = require('@fastify/static');
const AutoLoad = require('@fastify/autoload');
const helmet = require('@fastify/helmet');
const cors = require('@fastify/cors');
const path = require('path');
// Internal dependencies
const { Logger } = require('@siiges-services/shared');
const { validateApiKey } = require('./utils/auth.handler');
const { config } = require('../../../config/environment');

const fastify = Fastify({
  ajv: {
    customOptions: {
      allErrors: true,
    },
  },
  logger: true,
});

fastify.register(helmet);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../../../../../', 'public'),
});

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
});

fastify.register(multer.contentParser);

const options = {
  origin: (origin, cb) => {
    if (config.whiteList.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed'), false);
    }
  },
};

fastify.register(cors, {
  options,
});

fastify.addHook('preHandler', validateApiKey);

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  ignorePattern: /.*(schema).*/,
  options: { prefix: 'api/v1' },
});

const start = async () => {
  await fastify.listen(
    {
      port: config.serverPort,
      host: config.serverHost,
    },
    (err, address) => {
      if (err) {
        Logger.error(`[http-server]: Error with ${err.message} has happend`);
        process.exit(1);
      }
      Logger.info(`Server listening at ${address}`);
    },
  );
};

module.exports = { start, fastify };
