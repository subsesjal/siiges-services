// External dependencies
const { checkers } = require('@siiges-services/shared');

const updateFile = (updateFileQuery) => async (identifierObj) => {
  const fileUpdated = await updateFileQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(fileUpdated, 'files', identifierObj);

  return fileUpdated;
};

module.exports = updateFile;
