// Internal dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Usuario,
  TokenRecoveryPassword,
} = models;

const {
  findOneQuery,
  createQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneUserQuery: findOneQuery(Usuario),
  updateUserQuery: updateAndFindQuery(Usuario),
  createTokenRecoveryPasswordQuery: createQuery(TokenRecoveryPassword),
  findOneTokenRecoveryPasswordQuery: findOneQuery(TokenRecoveryPassword),
  updateTokenRecoveryPasswordQuery: updateAndFindQuery(TokenRecoveryPassword),
};
