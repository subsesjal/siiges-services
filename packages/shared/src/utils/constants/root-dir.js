const { join } = require('path');
const { config } = require('../../../../files/config/environment');

const rootDir = join(config.pathFile);

module.exports = rootDir;
