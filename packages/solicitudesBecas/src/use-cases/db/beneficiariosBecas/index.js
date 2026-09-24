const { beneficiariosBecas } = require('../../../adapters/db');

const findBeneficiariosBecas = require('./find-beneficiarios-becas.use-cases');

module.exports = {
  findBeneficiariosBecas: findBeneficiariosBecas(
    beneficiariosBecas.findOneUsuarioBeneficiarioBecaQuery,
  ),
};
