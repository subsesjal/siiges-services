/* eslint-disable import/no-extraneous-dependencies */
// External dependencies
const path = require('path');
const Fastify = require('fastify');
const multipart = require('@fastify/multipart'); // Enables file uploads
const fastifyStatic = require('@fastify/static'); // Serves static files
const AutoLoad = require('@fastify/autoload'); // Automatically loads routes/plugins
const helmet = require('@fastify/helmet'); // Adds security headers
const cors = require('@fastify/cors'); // Enables Cross-Origin Resource Sharing

// Internal dependencies
const { Logger } = require('@siiges-services/shared');
const { validateApiKey } = require('./utils/auth.handler'); // Middleware to validate API key
const { config } = require('../../../config/environment'); // Environment config (ports, host, whitelist, etc.)
const { maxFileSize } = require('./utils/constants'); // Constant for max upload size
const { publicLoader, privateLoader, externalLoader } = require('./plugins/loaders');

// Fastify instance configuration
const fastify = Fastify({
  ajv: {
    customOptions: {
      allErrors: true, // Collect all validation errors instead of stopping at the first
    },
    plugins: [multipart.ajvFilePlugin], // File upload validation
  },
  logger: process.env.NODE_ENV === 'development', // Use logger only in dev
});

// Register security headers middleware
fastify.register(helmet);

// Serve static files (e.g., from public/)
fastify.register(fastifyStatic, {
  root: path.join(process.env.PATH_FILE || 'C:/files', 'public'),
});

// Automatically register custom plugins from the plugins directory
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
});

// Enable multipart uploads with size limit and attach files to `request.body`
fastify.register(multipart, {
  attachFieldsToBody: true,
  limits: { fileSize: maxFileSize },
});

// Configure and register CORS with whitelist logic
const options = {
  origin: (origin, cb) => {
    if (config.whiteList.includes(origin)) {
      cb(null, true); // Allow request
    } else {
      Logger.warn(`Blocked CORS request from origin: ${origin}`);
      cb(new Error('Not allowed'), false); // Block request
    }
  },
};

fastify.register(cors, {
  options,
});

// Add preHandler hook to validate API Key for all routes
fastify.addHook('preHandler', validateApiKey);

// Register each scoped route group
fastify.register(publicLoader);
fastify.register(privateLoader);
fastify.register(externalLoader);

// Server startup function
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
