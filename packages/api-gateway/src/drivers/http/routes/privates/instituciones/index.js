const { institucionesAdapter } = require('../../../adapters');

const {
  createFormacionRectorSchema,
  updateFormacionRectorSchema,
  findAllFormacionRectorSchema,
  findOneFormacionRectorSchema,
} = require('./schema/formacionesRectores');
const {
  findAllInstitucionesSchema,
  findOneInstitucionSchema,
  findPlantelesInstitucionSchema,
  findOnePlantelSchema,
  findOnePlantelDetallesSchema,
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
    {
      schema: findAllInstitucionesSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findAllInstituciones,
  );

  await fastify.get(
    '/usuarios/:usuarioId',
    {
      schema: findOneInstitucionUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findOneInstitucionUsuario,
  );

  await fastify.get(
    '/:institucionId',
    {
      schema: findOneInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findOneInstitucion,
  );

  await fastify.post(
    '/',
    {
      schema: createInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.createInstitucion,
  );

  await fastify.patch(
    '/:institucionId',
    {
      schema: updateInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.updateInstitucion,
  );

  await fastify.delete(
    '/:institucionId',
    {
      schema: deleteInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.deleteInstitucion,
  );

  await fastify.get(
    '/:institucionId/planteles',
    {
      schema: findPlantelesInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findPlantelesInstitucion,
  );

  await fastify.get(
    '/:institucionId/planteles/:plantelId',
    {
      schema: findOnePlantelSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findOnePlantel,
  );

  await fastify.get(
    '/:institucionId/planteles/:plantelId/detalles',
    {
      schema: findOnePlantelDetallesSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findOnePlantelDetalles,
  );

  await fastify.post(
    '/:institucionId/planteles',
    {
      schema: createPlantelSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.createPlantel,
  );

  await fastify.patch(
    '/:institucionId/planteles/:plantelId',
    {
      schema: updatePlantelSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.updatePlantel,
  );

  await fastify.delete(
    '/:institucionId/planteles/:plantelId',
    {
      schema: deletePlantelSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.deletePlantel,
  );

  await fastify.post(
    '/:institucionId/ratificaciones',
    {
      schema: createRatificacionNombreSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.createRatificacionNombre,
  );

  await fastify.patch(
    '/:institucionId/ratificaciones/:ratificacionId',
    {
      schema: updateRatificacionNombreSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.updateRatificacionNombre,
  );

  await fastify.get(
    '/:institucionId/ratificaciones/:ratificacionId',
    {
      schema: findOneRatificacionNombreSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findOneRatificacionNombre,
  );

  await fastify.delete(
    '/:institucionId/ratificaciones/:ratificacionId',
    {
      schema: deleteRatificacionNombreSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.deleteRatificacionNombre,
  );

  await fastify.post(
    '/planteles/:plantelId/director',
    {
      schema: createDirectorSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.createDirectorPlantel,
  );

  await fastify.patch(
    '/planteles/:plantelId/director/:directorId',
    {
      schema: updateDirectorSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.updateDirectorPlantel,
  );

  await fastify.post(
    '/rectores/:rectorId/formaciones',
    {
      onRequest: [fastify.authenticate],
      schema: createFormacionRectorSchema,
    },
    institucionesAdapter.createFormacionRector,
  );

  await fastify.patch(
    '/rectores/:rectorId/formaciones/:formacionId',
    {
      onRequest: [fastify.authenticate],
      schema: updateFormacionRectorSchema,
    },
    institucionesAdapter.updateFormacionRector,
  );

  await fastify.get(
    '/rectores/:rectorId/formaciones',
    {
      onRequest: [fastify.authenticate],
      schema: findAllFormacionRectorSchema,
    },
    institucionesAdapter.findAllFormacionRector,
  );

  await fastify.get(
    '/rectores/:rectorId/formaciones/:formacionId',
    {
      onRequest: [fastify.authenticate],
      schema: findOneFormacionRectorSchema,
    },
    institucionesAdapter.findOneFormacionRector,
  );

  next();
}

module.exports = institucionRouter;
