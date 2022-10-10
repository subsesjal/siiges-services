const { checkers } = require('@siiges-services/shared');

const findOneUser = (findOneQuery) => async (
  identifierObj,
) => {
  const include = [
    { association: 'persona' },
  ];

  const user = await findOneQuery(identifierObj, { undefined, include });
  checkers.throwErrorIfDataIsFalsy(user, 'usuario', identifierObj);
  return user;
};

module.exports = findOneUser;
