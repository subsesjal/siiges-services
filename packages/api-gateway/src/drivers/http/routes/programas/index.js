const { programasAdapter } = require('../../adapters');
const {
  findAllProgramasSchema,
} = require('./schema');

async function programasRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findAllProgramasSchema },
    programasAdapter.findAllProgramas,
  );

  next();
}

module.exports = programasRouter;
