const { beneficiariosBecasAdapter } = require('../../../adapters');
const { findBeneficiariosBecasSchema } = require('./schema');

async function beneficiariosBecasRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: findBeneficiariosBecasSchema },
    beneficiariosBecasAdapter.findBeneficiariosBecas,
  );

  next();
}

module.exports = beneficiariosBecasRouter;
