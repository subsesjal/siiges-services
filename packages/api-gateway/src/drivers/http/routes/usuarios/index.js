const { usuariosAdapter } = require('../../adapters');

async function usuarioRouter(fastify) {
	//await fastify.get('/', usuariosAdapter.getUsuarios);
	await fastify.get('/:usuarioId', usuariosAdapter.getUsuarioById);
}

module.exports = usuarioRouter;
