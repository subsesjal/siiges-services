// Internal dependecies
const { envVars } = require('../../../config');
const { setPath } = require('../dotenv');

const filename = `${envVars.node.env}.env`;
const dotenvPath = setPath(filename);

module.exports = dotenvPath;
