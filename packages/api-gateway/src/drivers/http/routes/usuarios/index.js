//const { usuarioAdapter } = require('../../adapters')

async function usuarioRouter(fastify) {
	await fastify.get('/', async (request, reply) => {
		return { hello: 'world' };
	});
}

module.exports = usuarioRouter;
