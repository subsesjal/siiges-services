// External dependencies
const { checkers } = require('@siiges-services/shared');

const findOneEntityType = (findOneQuery) => (identifierObj) => {
  const documentTypeEntry = findOneQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(documentTypeEntry, 'files', identifierObj);
};

module.exports = findOneEntityType;
