const { join } = require('path');
const { pathFile } = require('../../../config/env-vars');

const rootDir = join(pathFile);

module.exports = rootDir;
