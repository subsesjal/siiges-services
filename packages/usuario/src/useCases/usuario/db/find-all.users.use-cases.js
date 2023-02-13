const findAllUsers = (findAllQuery) => async () => {
  const include = [{ association: 'persona' }, { association: 'rol' }];

  const users = await findAllQuery({}, { include });
  return users;
};

module.exports = findAllUsers;
