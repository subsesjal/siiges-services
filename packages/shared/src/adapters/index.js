const dotenv = require('./dotenv');
const nodejs = require('./nodejs');
const { getEnvironmentVar } = require('./environment-vars');

module.exports = {
  dotenv,
  nodejs,
  getEnvironmentVar,
};
