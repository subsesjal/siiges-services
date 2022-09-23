const fs = require('../../adapters/fs');

const writeBus = async (file, { tipoDocumento, tipoEntidad }, previousFile = undefined) => {
  const dirFilePath = fs.getFileDirPath(tipoEntidad, tipoDocumento);
  const fileName = fs.getFileName(tipoDocumento, file);
  const filePath = `${dirFilePath}/${fileName}`;
  const fileToUnlinkPath = `${dirFilePath}/${previousFile}`;

  fs.createFileDirIfNotExist(dirFilePath);
  fs.unlinkFileIfFileNameIsDefined(file, fileToUnlinkPath);
  fs.createFileIfNotExist(file, fileName, filePath);

  return fileName;
};

module.exports = writeBus;
