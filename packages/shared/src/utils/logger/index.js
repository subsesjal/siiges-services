const Winston = require('winston');

const Logger = Winston.createLogger({
  format: Winston.format.json(),
  transport: [
    new Winston.transports.Console(),
  ],
});

module.exports = Logger;
