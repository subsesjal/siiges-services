const solicitudesRevEquiv = require('../../../adapters/solicitudesRevEquiv/handlers');
const asignaturasAntecedentesEquivalnetesSchema = require('./schema/index');

async function asignaturasAntecedenteEquivalenteRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema:
      asignaturasAntecedentesEquivalnetesSchema.createAsignaturasAntecedentesEquivalencia,
    },
    solicitudesRevEquiv.createAsignaturaAntecedenteEquivalente,
  );

  await fastify.get(
    '/:asignaturaAntecedenteEquivalenteId',
    {
      schema:
      asignaturasAntecedentesEquivalnetesSchema.findOneAsignaturaAntecedenteEquivalenteSchema,
    },
    solicitudesRevEquiv.findOneAsignaturaAntecedenteEquivalente,
  );

  next();
}

module.exports = asignaturasAntecedenteEquivalenteRouter;
