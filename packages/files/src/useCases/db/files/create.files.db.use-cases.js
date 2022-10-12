// External dependencies
const { checkers } = require('@siiges-services/shared');

const createFile = (createFileQuery) => async (data) => {
  const fileCreated = await createFileQuery(data);
  checkers.throwErrorIfDataIsFalsy(fileCreated, 'files', data);

  return fileCreated;
};

module.exports = createFile;
