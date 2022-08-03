// External dependencies
const Fastify = require('fastify');
const AutoLoad = require('@fastify/autoload');
const helmet = require('@fastify/helmet');
const cors = require('@fastify/cors');
const path = require('path');
const { Logger } = require('@siiges-services/shared');
const {
	serverHost,
	whiteList,
	serverPort,
} = require('../../../config/environment');

const fastify = Fastify({
	ajv: {
		customOptions: {
			allErrors: true,
		},
	},
	logger: true,
});

fastify.register(helmet);

fastify.register(AutoLoad, {
	dir: path.join(__dirname, 'plugins'),
});

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

fastify.register(AutoLoad, {
	dir: path.join(__dirname, 'routes'),
	ignorePattern: /.*(schema).*/,
	options: { prefix: 'api/v1' },
});

const start = async () => {
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
};

module.exports = { start, fastify };
