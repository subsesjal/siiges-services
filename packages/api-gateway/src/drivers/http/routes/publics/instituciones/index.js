const { institucionesAdapter } = require('../../../adapters');

const { findInstitucionesByMunicipioSchema, findPlantelesByInstitucionPublicSchema } = require('./schema');

async function institucionRouter(fastify, opts, next) {
  await fastify.get(
    '/municipio',
    {
      schema: findInstitucionesByMunicipioSchema,
    },
    institucionesAdapter.findInstitucionesByMunicipio,
  );

  await fastify.get(
    '/:institucionId/planteles',
    {
      schema: findPlantelesByInstitucionPublicSchema,
    },
    institucionesAdapter.findPlantelesByInstitucionPublic,
  );

  next();
}

module.exports = institucionRouter;
