const findAllUsers = (findAllQuery) => async () => {
  const include = [
    { association: 'persona' },
  ];

  const users = await findAllQuery({ include });
  return users;
};

module.exports = findAllUsers;
