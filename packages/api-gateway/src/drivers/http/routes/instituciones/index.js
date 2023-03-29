const { institucionesAdapter } = require('../../adapters');

const {
  findAllInstitucionesSchema,
  findOneInstitucionSchema,
  findPlantelesInstitucionSchema,
  findOnePlantelSchema,
  createInstitucionSchema,
  createPlantelSchema,
  createDirectorSchema,
  updateInstitucionSchema,
  updatePlantelSchema,
  updateDirectorSchema,
  deleteInstitucionSchema,
  deletePlantelSchema,
  findOneRatificacionNombreSchema,
  createRatificacionNombreSchema,
  updateRatificacionNombreSchema,
  deleteRatificacionNombreSchema,
  findOneInstitucionUsuarioSchema,
} = require('./schema');

async function institucionRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllInstitucionesSchema },
    institucionesAdapter.findAllInstituciones,
  );

  await fastify.get(
    '/usuarios/:usuarioId',
    {
      schema: findOneInstitucionUsuarioSchema,
    },
    institucionesAdapter.findOneInstitucionUsuario,
  );

  await fastify.get(
    '/:institucionId',
    {
      schema: findOneInstitucionSchema,
    },
    institucionesAdapter.findOneInstitucion,
  );

  await fastify.post(
    '/',
    {
      schema: createInstitucionSchema,
    },
    institucionesAdapter.createInstitucion,
  );

  await fastify.patch(
    '/:institucionId',
    {
      schema: updateInstitucionSchema,
    },
    institucionesAdapter.updateInstitucion,
  );

  await fastify.delete(
    '/:institucionId',
    {
      schema: deleteInstitucionSchema,
    },
    institucionesAdapter.deleteInstitucion,
  );

  await fastify.get(
    '/:institucionId/planteles',
    {
      schema: findPlantelesInstitucionSchema,
    },
    institucionesAdapter.findPlantelesInstitucion,
  );

  await fastify.get(
    '/:institucionId/planteles/:plantelId',
    {
      schema: findOnePlantelSchema,
    },
    institucionesAdapter.findOnePlantel,
  );

  await fastify.post(
    '/:institucionId/planteles',
    {
      schema: createPlantelSchema,
    },
    institucionesAdapter.createPlantel,
  );

  await fastify.patch(
    '/:institucionId/planteles/:plantelId',
    {
      schema: updatePlantelSchema,
    },
    institucionesAdapter.updatePlantel,
  );

  await fastify.delete(
    '/:institucionId/planteles/:plantelId',
    {
      schema: deletePlantelSchema,
    },
    institucionesAdapter.deletePlantel,
  );

  await fastify.post(
    '/:institucionId/ratificaciones',
    {
      schema: createRatificacionNombreSchema,
    },
    institucionesAdapter.createRatificacionNombre,
  );

  await fastify.patch(
    '/:institucionId/ratificaciones/:ratificacionId',
    {
      schema: updateRatificacionNombreSchema,
    },
    institucionesAdapter.updateRatificacionNombre,
  );

  await fastify.get(
    '/:institucionId/ratificaciones/:ratificacionId',
    {
      schema: findOneRatificacionNombreSchema,
    },
    institucionesAdapter.findOneRatificacionNombre,
  );

  await fastify.delete(
    '/:institucionId/ratificaciones/:ratificacionId',
    {
      schema: deleteRatificacionNombreSchema,
    },
    institucionesAdapter.deleteRatificacionNombre,
  );

  await fastify.post(
    '/planteles/:plantelId/director',
    {
      schema: createDirectorSchema,
    },
    institucionesAdapter.createDirectorPlantel,
  );

  await fastify.patch(
    '/planteles/:plantelId/director/:directorId',
    {
      schema: updateDirectorSchema,
    },
    institucionesAdapter.updateDirectorPlantel,
  );

  next();
}

module.exports = institucionRouter;
