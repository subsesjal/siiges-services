// External dependencies
const Autoload = require('@fastify/autoload');
const Fastify = require('fastify');
const cors = require('@fastify/cors');
const path = require('path');

// Internal dependencies
//const authDecorators = require('./decorators/auth');

//Setup
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

/* fastify.register(cors, {
	origin: (origin, cb) => {
		const { hostname } = new URL(origin);
		if (hostname === 'localhost') {
			cb(null, true);
			return;
		}
		cb(new Error('Not allowed'), false);
	},
}); */

// Decorators for authorization
/* fastify.decorate('hasPermissions', authDecorators.hasPermissions);
fastify.decorate('hasRole', authDecorators.hasRole);
 */

fastify.register(Autoload, {
	dir: path.join(__dirname, 'routes'),
	ignorePattern: /.*(schema).*/,
});

//fastify.register(Autoload, { dir: path.join(__dirname, 'plugin') });

async function start() {
	try {
		await fastify.listen({
			port: process.env.SERVER_PORT || 3000,
			host: 'localhost',
		});
	} catch (error) {
		fastify.log.error(`[http-server]: Error with ${error.message} has happend`);
		process.exit(1);
	}
}

module.exports = {
	start,
	fastify,
};
