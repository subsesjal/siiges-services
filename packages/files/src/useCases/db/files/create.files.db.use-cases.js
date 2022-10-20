// External dependencies
const { checkers, Logger } = require('@siiges-services/shared');

const createFile = (createFileQuery) => async (data) => {
  Logger.info('[files]: Creating file');
  const fileCreated = await createFileQuery(data);
  checkers.throwErrorIfDataIsFalsy(fileCreated, 'files', data);
  Logger.info('[files] file created');

  return fileCreated;
};

module.exports = createFile;
