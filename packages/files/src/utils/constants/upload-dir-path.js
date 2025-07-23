const { join } = require('path');
const { constants } = require('@siiges-services/shared');

const uploadDir = join(constants.rootDir, 'public');

module.exports = uploadDir;
