const { models, queries } = require('@siiges-services/core');

const { UsuarioBeneficiarioBeca } = models;

const { findOneQuery, findAllQuery } = queries;

module.exports = {
  findOneUsuarioBeneficiarioBecaQuery: findOneQuery(UsuarioBeneficiarioBeca),
  findAllUsuariosBeneficiariosBecasQuery: findAllQuery(UsuarioBeneficiarioBeca),
};
