// External depenendecies
const Winston = require('winston');
const { join } = require('path');
const { getEnvironment } = require('../../adapters/nodejs');
const { isProdEnvironment } = require('../checkers');

const Logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.timestamp(),
    Winston.format.json(),
  ),
  transports: [
    new Winston.transports.File({
      filename: join('../../../../../', 'error.log'),
      level: 'error',
    }),
    new Winston.transports.File({
      filename: join('../../../../../', 'combined.log'),
    }),
  ],
});

if (!isProdEnvironment(getEnvironment())) {
  Logger.add(new Winston.transports.Console({
    format: Winston.format.simple(),
  }));
}

module.exports = Logger;
