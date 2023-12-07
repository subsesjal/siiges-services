// External dependencies
const { checkers, Logger } = require('@siiges-services/shared');

const updateFile = (updateFileQuery) => async (identifierObj, changes) => {
  Logger.info('[files]: Updating file');

  const fileUpdated = await updateFileQuery({ id: identifierObj }, changes);
  checkers.throwErrorIfDataIsFalsy(fileUpdated, 'files', identifierObj);
  Logger.info('[files]: file updated');

  return {
    ...fileUpdated.dataValues,
    url: `${process.env.SWAGGER_HOST}${fileUpdated.ubicacion}`,
  };
};

module.exports = updateFile;
