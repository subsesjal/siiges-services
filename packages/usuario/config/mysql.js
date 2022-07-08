const { config } = require('@siiges-services/core');
const { development, production } = config.mysqlConf;

module.exports = { development, production };
