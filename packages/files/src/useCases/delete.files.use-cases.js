const db = require('./db');
const fs = require('./fs');

async function deleteByParams(dataFile) {
  const identifierObj = await db.getFileIdentifierObj(dataFile);
  const fileDeleted = await db.deleteFile(identifierObj);

  await fs.deleteBus(fileDeleted);

  return fileDeleted;
}

module.exports = deleteByParams;
