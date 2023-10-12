const { alumnosAdapter } = require('../../adapters');
const {
  createAlumnoSchema,
  findOneAlumnoSchema,
  updateAlumnoSchema,
  findProgramaAlumnosSchema,
  deleteAlumnoSchema,
  alumnosInscripcionSchema,
  findAlumnosInscritosSchema,
} = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.createAlumno,
  );

  await fastify.get(
    '/programas/:programaId',
    {
      schema: findProgramaAlumnosSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findGroupAlumnosPrograma,
  );

  await fastify.get(
    '/:alumnoId',
    {
      schema: findOneAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findOneAlumno,
  );

  await fastify.patch(
    '/:alumnoId',
    {
      schema: updateAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.updateAlumno,
  );

  await fastify.delete(
    '/:alumnoId',
    {
      schema: deleteAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.deleteAlumno,
  );

  await fastify.post(
    '/grupos/:grupoId/inscripcion',
    {
      schema: alumnosInscripcionSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.alumnosInscripcion,
  );

  await fastify.get(
    '/grupos/:grupoId/inscripcion',
    {
      schema: findAlumnosInscritosSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findAlumnosInscritos,
  );

  next();
}

module.exports = asignaturaRouter;
