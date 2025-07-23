const { directory, file } = require('../../adapters/fs');

const writeBus = async (
  currentFile,
  { tipoDocumento, tipoEntidad, entidadId },
  previousFile = undefined,
) => {
  const dirFilePath = directory.createPath(tipoEntidad, tipoDocumento);
  const fileName = file.createName(tipoDocumento, currentFile, entidadId);
  const filePath = `${dirFilePath}/${fileName}`;
  const fileToUnlinkPath = file.createPath(previousFile);

  await directory.createIfNotExist(dirFilePath);
  await file.unlinkIfNameIsDefined(previousFile, fileToUnlinkPath);
  file.createIfNotExist(currentFile, fileName, filePath);

  return fileName;
};

module.exports = writeBus;
