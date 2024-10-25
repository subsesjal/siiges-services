const { calificacionesAdapter } = require('../../../adapters');
const schema = require('./schema');

async function calificacionRouter(fastify, opts, next) {
  await fastify.post(
    '/grupos/:grupoId/asignaturas/:asignaturaId',
    {
      schema: schema.updateCalificacionesSchema,
      onRequest: [fastify.authenticate],
    },
    calificacionesAdapter.updateCalificaciones,
  );

  await fastify.get(
    '/alumnos/:alumnoId',
    {
      schema: schema.findCalificacionesAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    calificacionesAdapter.findCalificacionesAlumno,
  );

  next();
}

module.exports = calificacionRouter;
