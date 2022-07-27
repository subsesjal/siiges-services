// External dependencies
const { join } = require('path');

// Internal dependencies
const envCheckers = require('../env-checkers');

const setPath = (filename) => {
  if (envCheckers.isDevEnvironment || envCheckers.isProdEnvironment) {
    const localPath = join(__dirname, '../../../../..', filename);
    return localPath;
  }

  throw new Error('By the moment only development and production environment is available');
};

module.exports = setPath;
