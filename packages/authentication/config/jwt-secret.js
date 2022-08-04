// External dependencies
const { dotenv } = require('@siiges-services/shared');

module.exports = dotenv.getEnvironmentVar('JWT_SECRET');
