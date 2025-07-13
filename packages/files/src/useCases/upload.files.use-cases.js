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

const uploadFile = (buildIdentifierObj) => async (fileMetdata, fileUploaded) => {
  const identifierObj = await buildIdentifierObj(fileMetdata);

  const previousFile = await db.findOneFile(identifierObj.fileMetaData);

  const fileName = await fs.writeBus(fileUploaded, fileMetdata, previousFile);
  const ubication = getUbication(fileMetdata, fileName);
  const data = createData(identifierObj.fileMetaData, fileName, ubication);

  if (previousFile) return db.updateFile(previousFile.id, data);

  return db.createFile(data);
};

module.exports = uploadFile;
