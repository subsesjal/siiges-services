const localStrategy = require('./local.strategy');
const strategyAdapter = require('../../adapters/strategies');
const { findOneUserQuery } = require('../../adapters/db/index');

module.exports = {
  localStrategy: localStrategy(strategyAdapter, findOneUserQuery),
};
