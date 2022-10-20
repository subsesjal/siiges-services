const { directory, file } = require('../../adapters/fs');

const writeBus = async (currentFile, { tipoDocumento, tipoEntidad }, previousFile = undefined) => {
  const dirFilePath = directory.createPath(tipoEntidad, tipoDocumento);
  const fileName = file.createName(tipoDocumento, currentFile);
  const filePath = `${dirFilePath}/${fileName}`;
  const fileToUnlinkPath = `${dirFilePath}/${previousFile}`;

  await directory.createIfNotExist(dirFilePath);
  await file.unlinkIfNameIsDefined(currentFile, fileToUnlinkPath);
  file.createIfNotExist(currentFile, fileName, filePath);

  return fileName;
};

module.exports = writeBus;
