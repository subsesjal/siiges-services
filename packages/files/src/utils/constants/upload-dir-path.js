const { join } = require('path');
const { constants } = require('@siiges-services/shared');

const uploadDir = join(process.env.PATH_FILEFILE, 'public');

module.exports = uploadDir;
