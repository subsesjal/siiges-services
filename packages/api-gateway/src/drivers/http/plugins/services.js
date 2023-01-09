const PluginLoader = require('fastify-plugin');
const UsuarioServices = require('@siiges-services/usuario');
const FilesServices = require('@siiges-services/files');
const InstitucionServices = require('@siiges-services/instituciones');

async function services(fastify) {
  await Promise.all([fastify.decorate('usuarioServices', UsuarioServices)]);
  await Promise.all([fastify.decorate('filesServices', FilesServices)]);
  await Promise.all([fastify.decorate('institucionServices', InstitucionServices)]);
}

module.exports = PluginLoader(services);
