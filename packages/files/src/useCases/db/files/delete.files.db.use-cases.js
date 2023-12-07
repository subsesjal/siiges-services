// External dependencies
const { checkers } = require('@siiges-services/shared');

const deleteFile = (findOneFile, deleteFileQuery) => async (identifierObj) => {
  const fileFind = await findOneFile(identifierObj);
  checkers.throwErrorIfDataIsFalsy(fileFind, 'delete file', identifierObj);
  const fileDeleted = await deleteFileQuery(identifierObj);
  return fileDeleted;
};

module.exports = deleteFile;
