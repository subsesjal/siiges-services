const localStrategy = require('./local.strategy');
const { tokenRecoveryPassword } = require('./recovery-password');
const strategyAdapter = require('../../adapters/strategies');
const { findOneUserQuery, createTokenRecoveryPasswordQuery } = require('../../adapters/db/index');

module.exports = {
  localStrategy: localStrategy(strategyAdapter, findOneUserQuery),
  tokenRecoveryPassword: tokenRecoveryPassword(findOneUserQuery, createTokenRecoveryPasswordQuery),
};
