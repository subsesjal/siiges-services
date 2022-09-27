// External dependencies
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const { getFileIdentifierObj } = require('./get-identifier-obj.files.db.use-cases');

const findOneFileByParams = (findOneQuery) => async (fileData, attributes, include) => {
  const identifierObj = getFileIdentifierObj(fileData);

  const file = await findOneQuery({
    ...identifierObj,
  }, { attributes, include });
  checkers.throwErrorIfDataIsFalsy(file, 'files', identifierObj);

  return file;
};

module.exports = findOneFileByParams;
