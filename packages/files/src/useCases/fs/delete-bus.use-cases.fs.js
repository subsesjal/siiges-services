const { file } = require('../../adapters/fs');

const deleteBus = async (filePath, currentFile = undefined) => {
  await file.unlinkIfNameIsDefined(currentFile, filePath);
};

module.exports = deleteBus;
