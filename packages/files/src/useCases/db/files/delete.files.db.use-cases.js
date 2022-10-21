// External dependencies
const { checkers } = require('@siiges-services/shared');

const deleteFile = (deleteFileQuery) => async (identifierObj) => {
  const fileDeleted = await deleteFileQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(fileDeleted, 'delete file', identifierObj);

  return fileDeleted;
};

module.exports = deleteFile;
