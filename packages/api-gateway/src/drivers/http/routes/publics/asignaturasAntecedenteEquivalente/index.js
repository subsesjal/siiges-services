const solicitudesRevEquiv = require('../../../adapters/solicitudesRevEquiv/handlers');
const createAsignaturasAntecedentesEquivalencia = require('./schema/index');

async function asignaturasAntecedenteEquivalenteRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createAsignaturasAntecedentesEquivalencia,
    },
    solicitudesRevEquiv.createAsignaturaAntecedenteEquivalente,
  );

  next();
}

module.exports = asignaturasAntecedenteEquivalenteRouter;
