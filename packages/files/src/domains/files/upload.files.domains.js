// Internal dependencies
const getFileIdentifierObj = require('../../useCases/db/get-identifier-obj.files.db.use-cases');
const { writeBus } = require('../../useCases/fs');

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

const uploadFile = (create, update, findOneByParams) => async (fileData, file) => {
  const identifierObj = getFileIdentifierObj(fileData);

  const previousFile = await findOneByParams(identifierObj);
  const fileName = await writeBus(file, fileData, previousFile);
  const ubication = getUbication(fileData, fileName);
  const data = createData(identifierObj, fileName, ubication);

  if (previousFile) return update(previousFile.id, data);

  return create(data);
};

module.exports = uploadFile;
