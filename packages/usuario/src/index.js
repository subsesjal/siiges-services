/**
 * @description Export all features and business rules from the package
 */

// Domains
const {
  findAllQuery,
  findOneDetailedQuery,
  findOneQuery,
  createQuery,
} = require('./domains');

// Services
const {
  findAllUsuarios,
  findOneUsuarioDetailed,
  findOneUsuario,
  createUsuario,
} = require('./useCases');

module.exports = {
  findAllUsuarios: findAllUsuarios(findAllQuery),
  findOneUsuario: findOneUsuario(findOneQuery),
  findOneUsuarioDetailed: findOneUsuarioDetailed(findOneDetailedQuery),
  createUsuario: createUsuario(createQuery),
};
