const fs = require('../../adapters/fs');

const deleteBus = async (file = undefined) => {
  const filePath = fs.getDirFilePath(file);
  fs.unlinkFileIfFileNameIsDefined(file, filePath);
};

module.exports = deleteBus;
