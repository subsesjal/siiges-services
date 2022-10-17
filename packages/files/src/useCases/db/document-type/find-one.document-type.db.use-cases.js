// External dependencies
const { checkers } = require('@siiges-services/shared');

const findOneDocumentType = (findOneQuery) => async (identifierObj) => {
  const documentTypeEntry = await findOneQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(documentTypeEntry, 'tipo de documento', identifierObj);

  return documentTypeEntry;
};

module.exports = findOneDocumentType;
