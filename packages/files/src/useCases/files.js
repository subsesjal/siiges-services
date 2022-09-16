// External dependencies
const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared')
// Internal dependencies
const { tipoEntidadObj, tipoDocumentoObj } = require('../utils/constants');
const { writeBus, deleteBus } = require('../utils/manageFiles');

function getIdentifierObj(fileData) {
  const { tipoEntidad, entidadId, tipoDocumento } = fileData;

  checkers.throwErrorIfDataIsFalsy(tipoEntidad, 'files', 'tipoEntidad');
  checkers.throwErrorIfDataIsFalsy(entidadId, 'files', 'entidadId');
  checkers.throwErrorIfDataIsFalsy(tipoDocumento, 'files', 'tipoDocumento');

  const tipoEntidadItem = tipoEntidadObj.find((item) => item.name === tipoEntidad);
  const tipoDocumentoItem = tipoEntidadObj.find((item) => item.name === tipoDocumento);

  return {
    entidadId,
    tipoEntidadId: tipoEntidadItem.id,
    tipoDocumentoId: tipoDocumentoItem.id,
  };
}

const findOneFileByParams = (findOneQuery) => async (fileData, attributes, include) => {
  const identifierObj = getIdentifierObj(fileData);

  const file = await findOneQuery({
    ...identifierObj,
  }, { attributes, include });
  checkers.ensureEntryWasFounded(file, 'files', identifierObj);

  return file;
};

const uploadFile = (updateQuery) => async (dataFile, file) => {
  const { tipoEntidad, entidadId, tipoDocumento } = dataFile;
  const tipoEntidadItem = tipoEntidadObj.find((item) => item.name === tipoEntidad);
  const tipoDocumentoItem = tipoDocumentoObj.find((item) => item.name === tipoDocumento);
  if (!tipoEntidadItem) {
    throw boom.badRequest(
      '[files:uploadFile]: body must have required property tipoEntidad',
    );
  }

  if (!tipoDocumentoItem) {
    throw boom.badRequest(
      '[files:uploadFile]: body must have required property tipoDocumento',
    );
  }

  const previousFile = await findOneByParamsQuery(
    tipoEntidadItem.id,
    entidadId,
    tipoDocumentoItem.id,
  );

  const writtenBus = await writeBus(file, tipoDocumento, tipoEntidad, previousFile);

  const data = {
    tipoEntidadId: tipoEntidadItem.id,
    entidadId,
    tipoDocumentoId: tipoDocumentoItem.id,
    nombre: writtenBus,
    ubicacion: `/uploads/${tipoEntidadItem.name}/${tipoDocumentoItem.name}/${(writtenBus)}`,
  };

  if (previousFile) {
    fileSaved = await updateQuery(previousFile.id, data);
  } else {
    fileSaved = await createQuery(data);
  }

  return fileSaved;
};

const deleteByParams = (deleteQuery, findOneByParamsQuery) => async (dataFile) => {
  const identifierObj = getIdentifierObj(dataFile);

  const file = await findOneByParamsQuery(
    { ...identifierObj },
  );

  await deleteBus(file);
  const fileDeleted = await deleteQuery(identifierObj);

  return fileDeleted;
};

module.exports = { uploadFile, findOneByParams, deleteByParams };
