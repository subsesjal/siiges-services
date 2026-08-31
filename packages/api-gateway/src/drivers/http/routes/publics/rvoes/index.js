const { programasAdapter } = require('../../../adapters');
const {
  findRvoePublicSchema,
  findMunicipiosJaliscoSchema,
  findInstitucionesByMunicipioSchema,
  findPlantelesByInstitucionSchema,
} = require('./schema');

async function rvoesRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findRvoePublicSchema },
    programasAdapter.findRvoePublic,
  );

  await fastify.get(
    '/municipios',
    { schema: findMunicipiosJaliscoSchema },
    programasAdapter.findMunicipiosJalisco,
  );

  await fastify.get(
    '/instituciones',
    { schema: findInstitucionesByMunicipioSchema },
    programasAdapter.findInstitucionesByMunicipio,
  );

  await fastify.get(
    '/planteles',
    { schema: findPlantelesByInstitucionSchema },
    programasAdapter.findPlantelesByInstitucion,
  );

  next();
}

module.exports = rvoesRouter;
