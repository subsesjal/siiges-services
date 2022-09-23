// External dependencies
const { checkers } = require('@siiges-services/shared');

const deleteFile = (deleteFileQuery) => async (identifierObj) => {
  const fileDeleted = await deleteFileQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(fileDeleted, 'files', identifierObj);

  return fileDeleted;
};

module.exports = deleteFile;
