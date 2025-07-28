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
  const { input, identifiers } = await buildIdentifierObj(fileMetdata);

  const previousFile = await db.findOneFile(identifiers);

  const fileName = await fs.writeBus(fileUploaded, input, previousFile);
  const ubication = getUbication(input, fileName);
  const data = createData(identifiers, fileName, ubication);

  if (previousFile) return db.updateFile(previousFile.id, data);

  return db.createFile(data);
};

module.exports = uploadFile;
