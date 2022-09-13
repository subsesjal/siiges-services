const { checkers } = require('@siiges-services/shared');

const findOneUser = (findOneQuery) => async (identifierObj, attributes, include) => {
  const user = await findOneQuery(identifierObj, { attributes, include });
  checkers.throwErrorIfDataIsFalsy(user);
  return user;
};

module.exports = findOneUser;
