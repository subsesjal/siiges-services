const { constants } = require('@siiges-services/shared');
const { join } = require('path');

const uploadDir = join(constants.rootDir, 'public');

module.exports = uploadDir;
