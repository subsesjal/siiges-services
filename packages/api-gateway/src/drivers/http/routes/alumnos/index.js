const { alumnosAdapter } = require('../../adapters');
const {
  createAlumnoSchema,
  findOneAlumnoSchema,
  updateAlumnoSchema,
  findProgramaAlumnosSchema,
  deleteAlumnoSchema,
} = require('./schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createAlumnoSchema },
    alumnosAdapter.createAlumno,
  );

  await fastify.get(
    '/programas/:programaId',
    { schema: findProgramaAlumnosSchema },
    alumnosAdapter.findGroupAlumnosPrograma,
  );

  await fastify.get(
    '/:alumnoId',
    { schema: findOneAlumnoSchema },
    alumnosAdapter.findOneAlumno,
  );

  await fastify.patch(
    '/:alumnoId',
    { schema: updateAlumnoSchema },
    alumnosAdapter.updateAlumno,
  );

  await fastify.delete(
    '/:alumnoId',
    { schema: deleteAlumnoSchema },
    alumnosAdapter.deleteAlumno,
  );

  next();
}

module.exports = asignaturaRouter;
