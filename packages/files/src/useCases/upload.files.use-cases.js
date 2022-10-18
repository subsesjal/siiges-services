// Internal dependencies
const db = require('./db');
const fs = require('./fs');

function createData({ tipoDocumentoId, tipoEntidadId, entidadId }, nombre, ubicacion) {
  return {
    entidadId,
    nombre,
    tipoDocumentoId,
    tipoEntidadId,
    ubicacion,
  };
}

function getUbication({ tipoEntidad, tipoDocumento }, fileName) {
  return `/uploads/${tipoEntidad}/${tipoDocumento}/${(fileName)}`;
}

async function uploadFile(fileData, fileUploaded) {
  const identifierObj = await db.getFileIdentifierObj(fileData);
  const previousFile = await db.findOneFile(identifierObj);
  const fileName = await fs.writeBus(fileUploaded, fileData, previousFile?.nombre);

  const ubication = getUbication(fileData, fileName);
  const data = createData(identifierObj, fileName, ubication);

  if (previousFile) return db.updateFile(previousFile.id, data);

  return db.createFile(data);
}

module.exports = uploadFile;
