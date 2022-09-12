const boom = require('@hapi/boom');

const findOneUser = (findOneQuery) => async (identifierObj, attributes, include) => {
  const user = await findOneQuery(identifierObj, { attributes, include });
  if (!user) {
    throw boom.notFound(
      `[usuarios:finOne]: can't find user with identifier: ${identifierObj}`,
    );
  }
  return user;
};

module.exports = findOneUser;
