// External dependencies
const autoLoad = require('@fastify/autoload');
const helmet = require('@fastify/helmet');
const Fastify = require('fastify');
const cors = require('@fastify/cors');
const path = require('path');
const {
	serverHost,
	whiteList,
	serverPort,
} = require('../../../config/environment');
const { Logger } = require('@siiges-services/shared');

// Internal dependencies
// const authDecorators = require('./decorators/auth');

// Setup
const isTestEnv = process.env.NODE_ENV === 'test';

const fastify = Fastify({
	// Disable logs in test enviroment
	logger: !isTestEnv,
});

// Avoid loading swagger when running tests
/* if (!isTestEnv) {
  // Swagger needs to be loaded before the routes
  fastify.register(Swagger, swaggerOptions);
} */

const options = {
	origin: (origin, cb) => {
		if (whiteList.includes(origin)) {
			cb(null, true);
		} else {
			cb(new Error('Not allowed'), false);
		}
	},
};

fastify.register(cors, {
	options,
});

// Decorators for authorization
/* fastify.decorate('hasPermissions', authDecorators.hasPermissions);
fastify.decorate('hasRole', authDecorators.hasRole);
 */
fastify.register(helmet);

fastify.register(autoLoad, {
	dir: path.join(__dirname, 'routes'),
	ignorePattern: /.*(schema).*/,
	options: { prefix: 'api/v1' },
});

fastify.register(autoLoad, { dir: path.join(__dirname, 'plugin') });

async function start() {
	await fastify.listen(
		{
			port: serverPort,
			host: serverHost,
		},
		(err, address) => {
			if (err) {
				Logger.error(`[http-server]: Error with ${err.message} has happend`);
				process.exit(1);
			}
			Logger.info(`Server listening at ${address}`);
		}
	);
}

module.exports = {
	start,
	fastify,
};
