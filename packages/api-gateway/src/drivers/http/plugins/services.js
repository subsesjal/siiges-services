const PluginLoader = require('fastify-plugin');
const UsuarioServices = require('@siiges-services/usuario');
const FilesServices = require('@siiges-services/files');
const InstitucionServices = require('@siiges-services/instituciones');
const SolicitudServices = require('@siiges-services/solicitudes');
const InspeccionServices = require('@siiges-services/inspecciones');

async function services(fastify) {
  await Promise.all([fastify.decorate('usuarioServices', UsuarioServices)]);
  await Promise.all([fastify.decorate('filesServices', FilesServices)]);
  await Promise.all([fastify.decorate('institucionServices', InstitucionServices)]);
  await Promise.all([fastify.decorate('solicitudServices', SolicitudServices)]);
  await Promise.all([fastify.decorate('inspeccionServices', InspeccionServices)]);
}

module.exports = PluginLoader(services);
