const { institucionesAdapter } = require('../../adapters');

const {
  getAllInstitucionesSchema,
  createInstitucionSchema,
  getInstitucionSchema,
  updateInstitucionSchema,
  deleteInstitucionSchema,
  getPlantelesInstitucionSchema,
  createPlantelInstitucionSchema,
} = require('./schema');

async function institucionRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: getAllInstitucionesSchema },
    institucionesAdapter.findAllInstituciones,
  );

  await fastify.get(
    '/:institucionId',
    {
      schema: getInstitucionSchema,
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
      schema: getPlantelesInstitucionSchema,
    },
    institucionesAdapter.findAllPlantelesInstitucion,
  );

  await fastify.post(
    '/:institucionId/planteles',
    {
      schema: createPlantelInstitucionSchema,
    },
    institucionesAdapter.createPlantelInstitucion,
  );

  /*
  await fastify.get(
    '/:usuarioId/detalle',
    {
      schema: getUsuarioDetalleSchema,
    },
    usuariosAdapter.findOneDetailedUsuario,
  );

  await fastify.patch(
    '/:usuarioId',
    {
      schema: updateUsuarioSchema,
    },
    usuariosAdapter.updateUsuario,
  );

  */

  next();
}

module.exports = institucionRouter;
