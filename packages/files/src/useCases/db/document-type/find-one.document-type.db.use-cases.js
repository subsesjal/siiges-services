// External dependencies
const { checkers } = require('@siiges-services/shared');

const findOneDocumentType = (findOneQuery) => (identifierObj) => {
  const documentTypeEntry = findOneQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(documentTypeEntry, 'files', identifierObj);
};

module.exports = findOneDocumentType;
