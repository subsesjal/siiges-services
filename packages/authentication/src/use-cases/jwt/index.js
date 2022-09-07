const signTokenModule = require('./sign-token');
const createPayloadsModule = require('./create-token-payloads');

module.exports = {
  ...signTokenModule,
  ...createPayloadsModule,
};
