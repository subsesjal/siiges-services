const { file } = require('../adapters/fs');
const db = require('./db');
const fs = require('./fs');

async function deleteByParams(dataFile) {
  const identifierObj = await db.getFileIdentifierObj(dataFile);
  const fileDeleted = await db.deleteFile(identifierObj);
  const filePath = file.createPath(fileDeleted.dataValues);
  await fs.deleteBus(filePath, fileDeleted.dataValues);

  return fileDeleted;
}

module.exports = deleteByParams;
