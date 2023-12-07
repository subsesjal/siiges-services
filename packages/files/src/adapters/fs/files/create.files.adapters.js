// External dependencies
const fs = require('fs');
const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');
// Ineternal dependencies
const { pathNotExist } = require('../path-exist.fs.adapters');

function create(file, fileName, filePath) {
  const tmpFilePath = file.filepath;
  const src = fs.createReadStream(tmpFilePath);
  const dest = fs.createWriteStream(filePath);

  src.pipe(dest);
  src.on('end', () => {
    Logger.info(`[files/fs.create]: ${fileName} file created`);
    return fileName;
  });
  src.on('error', (err) => {
    throw boom.conflict(`There was a conflict: ${err}`);
  });
}

function createIfNotExist(file, fileName, filePath) {
  Logger.info(`[files]: Making file with
file name: ${fileName}
filePath: ${filePath}`);
  if (pathNotExist(filePath)) create(file, fileName, filePath);
}

module.exports = { createIfNotExist };
