const { directory, file } = require('../../adapters/fs');

const deleteBus = async (currentFile = undefined) => {
  const filePath = directory.createPath(currentFile);
  await file.unlinkIfNameIsDefined(currentFile, filePath);
};

module.exports = deleteBus;
