const { join } = require('path');
const { config } = require('../../../../files/config/environment');

const rootDir = join(`${process.env.PATH_FILE}`);

module.exports = rootDir;
