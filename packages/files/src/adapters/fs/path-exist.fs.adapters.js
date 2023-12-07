const fs = require('fs');
const { Logger } = require('@siiges-services/shared');

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
