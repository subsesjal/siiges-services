// External dependencies
const dotenv = require('dotenv');
// Internal dependencies
const { getEnvironment } = require('../nodejs');
const setPath = require('./set-path');

const configPath = () => {
  const environment = getEnvironment();
  const filename = `${environment}.env`;
  const path = setPath(filename);

  dotenv.config({ path });
};

module.exports = configPath;
