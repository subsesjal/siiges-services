// Internal dependencies
const {
  createFile,
  findOneFileByParams,
  getFileIdentifierObj,
  updateFile,
} = require('./db');
const { writeBus } = require('./fs');

function createData({ tipoDocumentoId, tipoEntidadId, entidadId }, nombre, ubicacion) {
  return {
    tipoEntidadId,
    entidadId,
    tipoDocumentoId,
    nombre,
    ubicacion,
  };
}

function getUbication({ tipoEntidad, tipoDocumento }, fileName) {
  return `/uploads/${tipoEntidad}/${tipoDocumento}/${(fileName)}`;
}

async function uploadFile(fileData, documentFile) {
  const identifierObj = getFileIdentifierObj(fileData);

  const previousFile = await findOneFileByParams(identifierObj);
  const fileName = await writeBus(documentFile, fileData, previousFile);
  const ubication = getUbication(fileData, fileName);
  const data = createData(identifierObj, fileName, ubication);

  if (previousFile) return updateFile(previousFile.id, data);

  return createFile(data);
}

module.exports = uploadFile;
