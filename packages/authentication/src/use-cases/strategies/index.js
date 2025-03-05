const localStrategy = require('./local.strategy');
const { tokenRecoveryPassword } = require('./recovery-password');
const { findOneTokenRecoveryPassword } = require('./find-one.recovery-password');
const { changePasswordByMail, changePasswordByUserId } = require('./change-password');
const strategyAdapter = require('../../adapters/strategies');
const {
  findOneUserQuery,
  createTokenRecoveryPasswordQuery,
  findOneTokenRecoveryPasswordQuery,
  updateTokenRecoveryPasswordQuery,
  updateUserQuery,
} = require('../../adapters/db/index');

const findOneToken = findOneTokenRecoveryPassword(findOneTokenRecoveryPasswordQuery);

module.exports = {
  localStrategy: localStrategy(strategyAdapter, findOneUserQuery),
  tokenRecoveryPassword: tokenRecoveryPassword(findOneUserQuery, createTokenRecoveryPasswordQuery),
  findOneToken,
  changePasswordByMail: changePasswordByMail(
    updateTokenRecoveryPasswordQuery,
    updateUserQuery,
    findOneToken,
  ),
  changePasswordByUserId: changePasswordByUserId(updateUserQuery, findOneUserQuery),
};
