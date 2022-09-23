const { db } = require('./db');
const { fs } = require('./fs');

async function deleteByParams(dataFile) {
  const identifierObj = db.getFileIdentifierObj(dataFile);

  const file = await db.findOneFileByParams(
    { ...identifierObj },
  );

  await fs.deleteBus(file);
  const fileDeleted = await db.deleteFile(identifierObj);

  return fileDeleted;
}

module.exports = deleteByParams;
