const { join } = require('path');
const { dotenv } = require('@siiges-services/shared');

const rootDir = join(dotenv.getEnvironmentVar('PATH_FILE'));

module.exports = rootDir;
