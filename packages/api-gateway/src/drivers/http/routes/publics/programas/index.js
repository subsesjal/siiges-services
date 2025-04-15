const { programasAdapter } = require('../../../adapters');
const {
  findPlantelProgramasSchema,
  findAllProgramasSchema,
  findInstitucionProgramasSchema,
} = require('../../privates/programas/schema');

async function programasRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllProgramasSchema },
    programasAdapter.findAllProgramas,
  );

  await fastify.get(
    '/planteles/:plantelId',
    { schema: findPlantelProgramasSchema },
    programasAdapter.findPlantelProgramas,
  );

  await fastify.get(
    '/instituciones/:institucionId',
    { schema: findInstitucionProgramasSchema },
    programasAdapter.findInstitucionProgramas,
  );

  next();
}

module.exports = programasRouter;
