const { notificacionesAdapter } = require('../../adapters');

const {
  findGroupNotificacionesSchema,
  findOneNotificacionesSchema,
  deleteNotificacionesSchema,
} = require('./schemas');

async function notificacionesRouter(fastify, opts, next) {
  await fastify.get(
    '/usuarios/:usuarioId',
    {
      onRequest: [fastify.authenticate],
      schema: findGroupNotificacionesSchema,
    },
    notificacionesAdapter.findGroupNotificaciones,
  );
  await fastify.get(
    '/:notificacionId',
    {
      onRequest: [fastify.authenticate],
      schema: findOneNotificacionesSchema,
    },
    notificacionesAdapter.findOneNotificaciones,
  );
  await fastify.delete(
    '/:notificacionId',
    {
      onRequest: [fastify.authenticate],
      schema: deleteNotificacionesSchema,
    },
    notificacionesAdapter.deleteNotificaciones,
  );

  next();
}

module.exports = notificacionesRouter;
