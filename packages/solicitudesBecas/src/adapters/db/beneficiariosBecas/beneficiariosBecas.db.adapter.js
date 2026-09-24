const { models, queries } = require('@siiges-services/core');

const { UsuarioBeneficiarioBeca } = models;

const { findOneQuery } = queries;

module.exports = {
  findOneUsuarioBeneficiarioBecaQuery: findOneQuery(UsuarioBeneficiarioBeca),
};
