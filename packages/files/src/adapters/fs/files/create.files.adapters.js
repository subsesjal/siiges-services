// External dependencies
const fs = require('fs');
const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');
// Ineternal dependencies
const { pathNotExist } = require('../path-exist.fs.adapters');

function create(file, fileName, filePath) {
  if (Buffer.isBuffer(file)) {
    try {
      fs.writeFileSync(filePath, file);
      Logger.info(`[files/fs.create]: Buffer file ${fileName} created`);
      return fileName;
    } catch (err) {
      throw boom.conflict(`There was a conflict writing Buffer: ${err.message}`);
    }
  }

  const tmpFilePath = file.filepath;

  if (!tmpFilePath) {
    throw boom.badData('[files/fs.create]: Filepath is missing from uploaded file object.');
  }
  return new Promise((resolve, reject) => {
    const src = fs.createReadStream(tmpFilePath);
    const dest = fs.createWriteStream(filePath);

    src.pipe(dest);

    src.on('end', () => {
      Logger.info(`[files/fs.create]: Uploaded file ${fileName} created`);
      resolve(fileName);
    });

    src.on('error', (err) => {
      reject(boom.conflict(`There was a conflict streaming file: ${err.message}`));
    });
  });
}

function createIfNotExist(file, fileName, filePath) {
  Logger.info(`[files]: Making file with
file name: ${fileName}
filePath: ${filePath}`);
  if (pathNotExist(filePath)) create(file, fileName, filePath);
}

module.exports = { createIfNotExist };
