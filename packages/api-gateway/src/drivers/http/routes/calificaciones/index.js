const { calificacionesAdapter } = require('../../adapters');
const {
  updateCalificacionesSchema,
} = require('./schema');

async function alumnoRouter(fastify, opts, next) {
  await fastify.post(
    '/grupos/:grupoId/asignaturas/:asignaturaId',
    {
      schema: updateCalificacionesSchema,
      onRequest: [fastify.authenticate],
    },
    calificacionesAdapter.updateCalificaciones,
  );

  next();
}

module.exports = alumnoRouter;
