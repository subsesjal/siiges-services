const { plantelesAdapter, institucionesAdapter } = require('../../../adapters');

const {
  createFormacionDirectorSchema,
  updateFormacionDirectorSchema,
  findAllFormacionDirectorSchema,
  findOneFormacionDirectorSchema,
} = require('./schema/formacionDirectores');
const {
  createUpdatePlantelHigieneSchema,
  deletePlantelHigieneSchema,
  findAllHigienesSchema,
  findGroupPlantelHigieneSchema,
  createPlantelInfraestructuraSchema,
  deletePlantelInfraestructuraSchema,
  findGroupPlantelInfraestructuraSchema,
  findGroupPlantelesUsuarioSchema,
  findAllEdificiosNivelesSchema,
  createUpdatePlantelNivelesSchema,
  findGroupPlantelNivelesSchema,
  createSaludInstitucionSchema,
  findPlantelSaludInstitucionSchema,
  findOneSaludInstitucionSchema,
  deleteSaludInstitucionSchema,
  updateSaludInstitucionSchema,
  findAllSeguridadSistemasSchema,
  findGroupPlantelSeguridadSchema,
  createUpdatePlantelSeguridadSchema,
  createDirectorSchema,
  updateDirectorSchema,
  findOnePlantelInfraestructuraSchema,
  updateInfraestructuraSchema,
} = require('./schema');

async function plantelRouter(fastify, opts, next) {
  // Higienes
  await fastify.get(
    '/higienes',
    {
      schema: findAllHigienesSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findAllHigienes,
  );

  await fastify.post(
    '/:plantelId/higienes',
    {
      schema: createUpdatePlantelHigieneSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.createPlantelHigiene,
  );

  await fastify.get(
    '/:plantelId/higienes',
    {
      schema: findGroupPlantelHigieneSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findGroupPlantelHigiene,
  );

  await fastify.delete(
    '/:plantelId/higienes/:higieneId',
    {
      schema: deletePlantelHigieneSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.deletePlantelHigiene,
  );

  // Infraestructuras
  await fastify.get(
    '/:plantelId/infraestructuras/:infraestructuraId',
    {
      schema: findOnePlantelInfraestructuraSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findOnePlantelInfraestructura,
  );

  await fastify.get(
    '/:plantelId/programas/:programaId/infraestructuras',
    {
      schema: findGroupPlantelInfraestructuraSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findGroupPlantelInfraestructura,
  );

  await fastify.post(
    '/:plantelId/infraestructuras',
    {
      schema: createPlantelInfraestructuraSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.createPlantelInfraestructura,
  );

  await fastify.patch(
    '/:plantelId/infraestructuras/:infraestructuraId',
    {
      schema: updateInfraestructuraSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.updateInfraestructura,
  );

  await fastify.delete(
    '/:plantelId/infraestructuras/:infraestructuraId',
    {
      schema: deletePlantelInfraestructuraSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.deletePlantelInfraestructura,
  );

  // Edificios niveles
  await fastify.get(
    '/niveles',
    {
      schema: findAllEdificiosNivelesSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findAllEdificiosNiveles,
  );

  await fastify.post(
    '/:plantelId/niveles',
    {
      schema: createUpdatePlantelNivelesSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.createUpdatePlantelNiveles,
  );

  await fastify.get(
    '/:plantelId/niveles',
    {
      schema: findGroupPlantelNivelesSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findGroupPlantelNiveles,
  );

  // Salud Instuciones
  await fastify.post(
    '/:plantelId/saludInstituciones',
    {
      schema: createSaludInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.createSaludInstitucion,
  );

  await fastify.get(
    '/:plantelId/saludInstituciones',
    {
      schema: findPlantelSaludInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findPlantelSaludInstituciones,
  );

  await fastify.get(
    '/:plantelId/saludInstituciones/:saludInstitucionId',
    {
      schema: findOneSaludInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.findOneSaludInstituciones,
  );

  await fastify.delete(
    '/:plantelId/saludInstituciones/:saludInstitucionId',
    {
      schema: deleteSaludInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.deleteSaludInstitucion,
  );

  await fastify.patch(
    '/:plantelId/saludInstituciones/:saludInstitucionId',
    {
      schema: updateSaludInstitucionSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.updateSaludInstitucion,
  );

  // Seguridad Sistemas
  await fastify.get(
    '/seguridad',
    {
      schema: findAllSeguridadSistemasSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findAllSeguridad,
  );

  await fastify.post(
    '/:plantelId/seguridad',
    {
      schema: createUpdatePlantelSeguridadSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.createUpdatePlantelSeguridad,
  );

  await fastify.get(
    '/:plantelId/seguridad',
    {
      schema: findGroupPlantelSeguridadSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findGroupPlantelSeguridad,
  );

  await fastify.post(
    '/directores/:directorId/formaciones',
    {
      onRequest: [fastify.authenticate],
      schema: createFormacionDirectorSchema,
    },
    plantelesAdapter.createFormacionDirector,
  );

  await fastify.patch(
    '/directores/:directorId/formaciones/:formacionId',
    {
      schema: updateFormacionDirectorSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.updateFormacionDirector,
  );

  await fastify.get(
    '/directores/:directorId/formaciones',
    {
      onRequest: [fastify.authenticate],
      schema: findAllFormacionDirectorSchema,
    },
    plantelesAdapter.findAllFormacionDirector,
  );

  await fastify.get(
    '/directores/:directorId/formaciones/:formacionId',
    {
      onRequest: [fastify.authenticate],
      schema: findOneFormacionDirectorSchema,
    },
    plantelesAdapter.findOneFormacionDirector,
  );

  // Directores
  await fastify.post(
    '/:plantelId/director',
    {
      schema: createDirectorSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.createDirectorPlantel,
  );

  await fastify.patch(
    '/:plantelId/director/:directorId',
    {
      schema: updateDirectorSchema,
      onRequest: [fastify.authenticate],
    },
    institucionesAdapter.updateDirectorPlantel,

  );

  await fastify.get(
    '/usuarios/:usuarioId',
    {
      schema: findGroupPlantelesUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    plantelesAdapter.findGroupPlantelesUsuario,
  );

  next();
}

module.exports = plantelRouter;
