const { programasAdapter } = require('../../../adapters');
const {
  findPlantelProgramasSchema,
} = require('../../privates/programas');

async function programasRouter(fastify, opts, next) {
  await fastify.get(
    '/planteles/:plantelId',
    {
      schema: findPlantelProgramasSchema,
    },
    programasAdapter.findPlantelProgramas,
  );

  next();
}

module.exports = programasRouter;
