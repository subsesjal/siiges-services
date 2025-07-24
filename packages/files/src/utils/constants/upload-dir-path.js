const { join } = require('path');
const { constants } = require('@siiges-services/shared');

const uploadDir = join(process.env.PATH_FILE, 'public');

module.exports = uploadDir;
