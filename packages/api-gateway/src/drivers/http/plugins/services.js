const PluginLoader = require('fastify-plugin');
const UsuarioServices = require('@siiges-services/usuario');
const FilesServices = require('@siiges-services/files');
const InstitucionServices = require('@siiges-services/instituciones');
const SolicitudServices = require('@siiges-services/solicitudes');
const InspeccionServices = require('@siiges-services/inspecciones');
const AuthenticationServices = require('@siiges-services/authentication');
const NotificacionServices = require('@siiges-services/notificaciones');
const AdministracionAcademicaServices = require('@siiges-services/administracionacademica');

async function services(fastify) {
  await Promise.all([fastify.decorate('usuarioServices', UsuarioServices)]);
  await Promise.all([fastify.decorate('filesServices', FilesServices)]);
  await Promise.all([fastify.decorate('institucionServices', InstitucionServices)]);
  await Promise.all([fastify.decorate('solicitudServices', SolicitudServices)]);
  await Promise.all([fastify.decorate('inspeccionServices', InspeccionServices)]);
  await Promise.all([fastify.decorate('authServices', AuthenticationServices)]);
  await Promise.all([fastify.decorate('notificacionServices', NotificacionServices)]);
  await Promise.all([fastify.decorate('administracionAcademicaServices', AdministracionAcademicaServices)]);
}

module.exports = PluginLoader(services);
