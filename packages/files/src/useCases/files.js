/* eslint-disable no-undef */
const boom = require('@hapi/boom');
const { TIPO_ENTIDAD, TIPO_DOCUMENTO } = require('../utils/constants');
const { writeBus, deleteBus } = require('../utils/manageFiles');

const findOneByParams = (findOneByParamsQuery) => async (dataFile) => {
  const { tipoEntidad, entidadId, tipoDocumento } = dataFile;
  const tipoEntidadItem = TIPO_ENTIDAD.find((item) => item.name === tipoEntidad);
  const tipoDocumentoItem = TIPO_DOCUMENTO.find((item) => item.name === tipoDocumento);

  if (!tipoEntidadItem) {
    throw boom.badRequest(
      '[files:uploadFile]: tipoEntidad is incorrect',
    );
  }

  if (!tipoDocumentoItem) {
    throw boom.badRequest(
      '[files:uploadFile]: tipoDocumento is incorrect',
    );
  }

  const file = await findOneByParamsQuery(
    tipoEntidadItem.id,
    entidadId,
    tipoDocumentoItem.id,
  );

  if (!file) {
    throw boom.notFound(
      `[files:finOne]: File not found ${tipoDocumento} with entidadId: ${entidadId}`,
    );
  }

  return file;
};

const uploadFile = (createQuery, updateQuery, findOneByParamsQuery) => async (dataFile, file) => {
  const { tipoEntidad, entidadId, tipoDocumento } = dataFile;
  const tipoEntidadItem = TIPO_ENTIDAD.find((item) => item.name === tipoEntidad);
  const tipoDocumentoItem = TIPO_DOCUMENTO.find((item) => item.name === tipoDocumento);
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
    tipoEntidad: tipoEntidadItem.id,
    entidadId,
    tipoDocumento: tipoDocumentoItem.id,
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
  const { tipoEntidad, entidadId, tipoDocumento } = dataFile;
  const tipoEntidadItem = TIPO_ENTIDAD.find((item) => item.name === tipoEntidad);
  const tipoDocumentoItem = TIPO_DOCUMENTO.find((item) => item.name === tipoDocumento);

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

  const file = await findOneByParamsQuery(
    tipoEntidadItem.id,
    entidadId,
    tipoDocumentoItem.id,
  );

  if (!file) {
    throw boom.notFound(
      `[files:finOne]: Archivo no encontrado ${tipoDocumento} con entidadId: ${entidadId}`,
    );
  }

  await deleteBus(file);

  const fileDeleted = await deleteQuery(file.id);

  return fileDeleted;
};

module.exports = { uploadFile, findOneByParams, deleteByParams };
