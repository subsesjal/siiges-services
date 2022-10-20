const { Logger } = require('@siiges-services/shared');
const fs = require('fs');

function pathExist(directoryPath) {
  Logger.info('[files]: checking if the path exist');
  return fs.existsSync(directoryPath);
}

function pathNotExist(directoryPath) {
  return !pathExist(directoryPath);
}

module.exports = {
  pathExist,
  pathNotExist,
};
