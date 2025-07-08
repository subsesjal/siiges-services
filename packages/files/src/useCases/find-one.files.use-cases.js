// Internal dependencies
const { checkers } = require('@siiges-services/shared');
const db = require('./db');
const fs = require('./fs');
const { buildIdentifierObj, generatePdfFile } = require('../utils/features');

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

async function findOneFile(fileMetdata) {
  const identifierObj = await buildIdentifierObj(fileMetdata);
  const generator = await generatePdfFile(identifierObj);

  const previousFile = await db.findOneFile(identifierObj.fileMetaData);

  if (generator) {
    const file = await generator();

    const fileName = await fs.writeBus(file, fileMetdata, previousFile);
    const ubication = getUbication(fileMetdata, fileName);
    const data = createData(identifierObj.fileMetaData, fileName, ubication);
    if (previousFile) return db.updateFile(previousFile.id, data);
    return db.createFile(data);
  }

  checkers.throwErrorIfDataIsFalsy(previousFile, 'file', identifierObj.fileMetaData);

  return previousFile;
}

module.exports = findOneFile;
