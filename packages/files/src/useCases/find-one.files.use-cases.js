// Internal dependencies
const { checkers, Logger } = require('@siiges-services/shared');
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

const findOneFile = (buildIdentifierObj, buildFile) => async (fileMetdata) => {
  Logger.info('[files.findOneFile.use-case]: Iniciando búsqueda de archivo');
  const { input, identifiers } = await buildIdentifierObj(fileMetdata);
  const builder = await buildFile(input);
  const previousFile = await db.findOneFile(identifiers);

  if (builder) {
    const file = await builder();
    const fileName = await fs.writeBus(file, input, previousFile);
    const ubication = getUbication(input, fileName);
    const data = createData(identifiers, fileName, ubication);

    if (previousFile) return db.updateFile(previousFile.id, data);
    return db.createFile(data);
  }

  checkers.throwErrorIfDataIsFalsy(previousFile, 'file', identifiers);

  return previousFile;
};

module.exports = findOneFile;
