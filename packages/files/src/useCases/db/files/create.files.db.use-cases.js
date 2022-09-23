// External dependencies
const { checkers } = require('@siiges-services/shared');

const createFile = (createFileQuery) => async (identifierObj) => {
  const fileCreated = await createFileQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(fileCreated, 'files', identifierObj);

  return fileCreated;
};

module.exports = createFile;
