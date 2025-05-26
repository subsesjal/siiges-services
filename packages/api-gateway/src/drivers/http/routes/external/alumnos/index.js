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

  /* await fastify.get(
    '/:matricula',
    {
      schema: schema.findOneAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findOneAlumno,
  ); */

  /*   await fastify.post(
    '/grupos/:grupoId/inscripcion',
    {
      schema: schema.alumnosInscripcionSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.alumnosInscripcion,
  );

  await fastify.get(
    '/grupos/:grupoId/inscripcion',
    {
      schema: schema.findAlumnosInscritosSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findAlumnosInscritos,
  );

  await fastify.post(
    '/:alumnoId/validaciones',
    {
      schema: schema.createValidacionSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.createAlumnoValidacion,
  ); */

  next();
}

module.exports = asignaturaRouter;
