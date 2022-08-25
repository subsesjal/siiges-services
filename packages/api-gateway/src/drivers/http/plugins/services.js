const PluginLoader = require('fastify-plugin');
const UsuarioServices = require('@siiges-services/usuario');
const FilesServices = require('@siiges-services/files');

async function services(fastify) {
  await Promise.all([fastify.decorate('usuarioServices', UsuarioServices)]);
  await Promise.all([fastify.decorate('filesServices', FilesServices)]);
}

module.exports = PluginLoader(services);
