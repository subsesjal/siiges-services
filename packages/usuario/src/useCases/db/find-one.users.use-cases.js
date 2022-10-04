const { checkers } = require('@siiges-services/shared');

const findOneUser = (findOneQuery) => async (
  identifierObj,
  { attributes = undefined, include = undefined, strict = true },
) => {
  const user = await findOneQuery(identifierObj, { attributes, include, strict });
  checkers.throwErrorIfDataIsFalsy(user, 'usuario', identifierObj);
  return user;
};

module.exports = findOneUser;
