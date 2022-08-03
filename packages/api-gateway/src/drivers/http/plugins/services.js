const fp = require('fastify-plugin');
const UsuarioServices = require('@siiges-services/usuario');

async function services(fastify) {
  await Promise.all([fastify.decorate('usuarioServices', UsuarioServices)]);
}

module.exports = fp(services);
