const LocalStrategy = require('./local.strategy');
const strategyAdapter = require('../../adapters/strategies');
const { findOneUserQuery } = require('../../adapters/db/index');

module.exports = {
  LocalStrategy: LocalStrategy(strategyAdapter, findOneUserQuery),
};
