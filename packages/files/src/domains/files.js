const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const findOneByParamsQuery = (fileModel) => async (tipoEntidad, entidadId, tipoDocumento) => {
  const file = await fileModel.findOne({
    where: {
      tipoEntidad,
      entidadId,
      tipoDocumento,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  return file;
};

const createQuery = (fileModel) => async (data) => {
  const newFile = await fileModel.create(data);

  return newFile;
};

const updateQuery = (fileModel) => async (id, changes) => {
  const file = await fileModel.findOne({
    where: {
      id,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  if (!file) {
    throw boom.notFound(`[files:update]: Archivo no encontrado con id: ${id}`);
  }

  const updatedAt = new Date().toISOString();
  const fileChanges = { ...changes, updatedAt };

  const fileUpdated = await file.update(fileChanges);

  return fileUpdated;
};

const deleteQuery = (fileModel) => async (id) => {
  const file = await fileModel.findOne({
    where: {
      id,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  if (!file) {
    throw boom.notFound(`[files:delete]: Archivo no encontrado con id ${id}`);
  }

  const deletedAt = new Date().toISOString();
  const fileDeleted = await file.update({ deletedAt });

  return fileDeleted;
};

module.exports = {
  findOneByParamsQuery,
  createQuery,
  updateQuery,
  deleteQuery,
};
