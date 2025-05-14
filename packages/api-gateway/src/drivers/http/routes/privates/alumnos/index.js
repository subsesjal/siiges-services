const { alumnosAdapter } = require('../../../adapters');
const alumnosSchema = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: alumnosSchema.createAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.createAlumno,
  );

  await fastify.get(
    '/programas/:programaId',
    {
      schema: alumnosSchema.findProgramaAlumnosSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findGroupAlumnosPrograma,
  );

  await fastify.get(
    '/:alumnoId',
    {
      schema: alumnosSchema.findOneAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findOneAlumno,
  );

  await fastify.patch(
    '/:alumnoId',
    {
      schema: alumnosSchema.updateAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.updateAlumno,
  );

  await fastify.delete(
    '/:alumnoId',
    {
      schema: alumnosSchema.deleteAlumnoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.deleteAlumno,
  );

  await fastify.post(
    '/grupos/:grupoId/inscripcion',
    {
      schema: alumnosSchema.alumnosInscripcionSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.alumnosInscripcion,
  );

  await fastify.delete(
    '/:alumnoId/grupos/:grupoId/inscripcion',
    {
      schema: alumnosSchema.deleteAlumnoInscritoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.deleteAlumnoInscrito,
  );

  await fastify.get(
    '/grupos/:grupoId/inscripcion',
    {
      schema: alumnosSchema.findAlumnosInscritosSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findAlumnosInscritos,
  );

  await fastify.post(
    '/:alumnoId/validaciones',
    {
      schema: alumnosSchema.createValidacionSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.createAlumnoValidacion,
  );

  await fastify.get(
    '/:alumnoId/validaciones',
    {
      schema: alumnosSchema.findOneValidacionSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findOneAlumnoValidacion,
  );

  await fastify.patch(
    '/:alumnoId/validaciones',
    {
      schema: alumnosSchema.updateValidacionSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.updateAlumnoValidacion,
  );

  await fastify.get(
    '/grupos/:grupoId/asignatura/:asignaturaId',
    {
      schema: alumnosSchema.findAlumnosGrupoSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findAlumnosGrupo,
  );

  await fastify.get(
    '/programas/:programaId/count',
    {
      schema: alumnosSchema.findAlumnosCountSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findAlumnosCount,
  );

  await fastify.get(
    '/ciclos/:cicloEscolarId/extraordinarios',
    {
      schema: alumnosSchema.findAlumnosExtraSchema,
      onRequest: [fastify.authenticate],
    },
    alumnosAdapter.findAlumnosExtra,
  );

  next();
}

module.exports = asignaturaRouter;
