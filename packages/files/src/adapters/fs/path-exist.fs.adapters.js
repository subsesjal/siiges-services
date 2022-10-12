const fs = require('fs');

function pathExist(directoryPath) {
  return fs.existsSync(directoryPath);
}

function pathNotExist(directoryPath) {
  return !pathExist(directoryPath);
}

module.exports = {
  pathExist,
  pathNotExist,
};
