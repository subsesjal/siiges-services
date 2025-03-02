// Internal dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Usuario,
  TokenRecoveryPassword,
} = models;

const {
  findOneQuery,
  createQuery,
  updateQuery,
} = queries;

module.exports = {
  findOneUserQuery: findOneQuery(Usuario),
  updateUserQuery: updateQuery(Usuario),
  createTokenRecoveryPasswordQuery: createQuery(TokenRecoveryPassword),
  findOneTokenRecoveryPasswordQuery: findOneQuery(TokenRecoveryPassword),
  updateTokenRecoveryPasswordQuery: updateQuery(TokenRecoveryPassword),
};
