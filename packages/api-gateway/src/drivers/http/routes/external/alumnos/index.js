const { alumnosAdapter } = require('../../../adapters/external');
const schema = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: schema.createAlumno,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['externo']),
      ],
    },
    alumnosAdapter.create,
  );

  await fastify.post(
    '/inscripcion',
    {
      schema: schema.inscripcionSchema,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['externo']),
      ],
    },
    alumnosAdapter.inscripcion,
  );

  await fastify.post(
    '/calificaciones',
    {
      schema: schema.calificacionesSchema,
      onRequest: [
        fastify.authenticate,
        fastify.authorizeRole(['externo']),
      ],
    },
    alumnosAdapter.calificaciones,
  );

  next();
}

module.exports = asignaturaRouter;
