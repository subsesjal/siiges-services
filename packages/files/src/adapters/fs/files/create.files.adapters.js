// External dependencies
const boom = require('@hapi/boom');
const fs = require('fs');
// Ineternal dependencies
const { pathNotExist } = require('../path-exist.fs.adapters');

function create(file, fileName, filePath) {
  const tmpFilePath = file.path;
  const src = fs.createReadStream(tmpFilePath);
  const dest = fs.createWriteStream(filePath);

  src.pipe(dest);
  src.on('end', () => fileName);
  src.on('error', (err) => {
    throw boom.conflict(`There was a conflict: ${err}`);
  });
}

function createIfNotExist(file, fileName, filePath) {
  if (pathNotExist(filePath)) create(file, fileName, filePath);
}

module.exports = { createIfNotExist };
