const { institucionesAdapter } = require('../../../adapters');

const {
  findAllInstitucionesSchema,
  findPlantelesInstitucionSchema,
} = require('../../privates/instituciones');

async function institucionRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllInstitucionesSchema,
    },
    institucionesAdapter.findAllInstituciones,
  );

  await fastify.get(
    '/:institucionId/planteles',
    {
      schema: findPlantelesInstitucionSchema,
    },
    institucionesAdapter.findPlantelesInstitucion,
  );

  next();
}

module.exports = institucionRouter;
