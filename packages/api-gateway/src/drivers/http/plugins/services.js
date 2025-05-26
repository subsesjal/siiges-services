const PluginLoader = require('fastify-plugin');
const UsuarioServices = require('@siiges-services/usuario');
const FilesServices = require('@siiges-services/files');
const InstitucionServices = require('@siiges-services/instituciones');
const SolicitudServices = require('@siiges-services/solicitudes');
const InspeccionServices = require('@siiges-services/inspecciones');
const AuthenticationServices = require('@siiges-services/authentication');
const NotificacionServices = require('@siiges-services/notificaciones');
const AdministracionAcademicaServices = require('@siiges-services/administracionacademica');
const OpdServices = require('@siiges-services/opd');
const VigilanciaServices = require('@siiges-services/vigilancias');
const SolicitudFolioServices = require('@siiges-services/solicitudesfolios');
const SolicitudRevEquivServices = require('@siiges-services/solicitudesrevequiv');
const SolicitudBecaServices = require('@siiges-services/solicitudesbecas');
const SolicitudServicioSocialServices = require('@siiges-services/solicitudesserviciosocial');
const ExternalServices = require('@siiges-services/external-service');

async function services(fastify) {
  await Promise.all([fastify.decorate('usuarioServices', UsuarioServices)]);
  await Promise.all([fastify.decorate('filesServices', FilesServices)]);
  await Promise.all([fastify.decorate('institucionServices', InstitucionServices)]);
  await Promise.all([fastify.decorate('solicitudServices', SolicitudServices)]);
  await Promise.all([fastify.decorate('inspeccionServices', InspeccionServices)]);
  await Promise.all([fastify.decorate('authServices', AuthenticationServices)]);
  await Promise.all([fastify.decorate('notificacionServices', NotificacionServices)]);
  await Promise.all([fastify.decorate('administracionAcademicaServices', AdministracionAcademicaServices)]);
  await Promise.all([fastify.decorate('opdServices', OpdServices)]);
  await Promise.all([fastify.decorate('vigilanciaServices', VigilanciaServices)]);
  await Promise.all([fastify.decorate('solicitudFolioServices', SolicitudFolioServices)]);
  await Promise.all([fastify.decorate('solicitudRevEquivServices', SolicitudRevEquivServices)]);
  await Promise.all([fastify.decorate('solicitudBecaServices', SolicitudBecaServices)]);
  await Promise.all([fastify.decorate('solicitudServicioSocialServices', SolicitudServicioSocialServices)]);
  await Promise.all([fastify.decorate('externalServices', ExternalServices)]);
}

module.exports = PluginLoader(services);
