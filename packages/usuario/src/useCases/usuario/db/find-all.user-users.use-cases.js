const findAllUserUsers = (findAllUserUsersQuery) => async (principalId) => {
  const include = [
    {
      association: 'principal',
      include: [{ association: 'persona' }, { association: 'rol' }],
    },
    {
      association: 'secundario',
      include: [{ association: 'persona' }, { association: 'rol' }],
    },
  ];

  const userUsers = await findAllUserUsersQuery(
    { principalId },
    { include, strict: true },
  );

  return userUsers.map((userUser) => {
    const userTransformed = userUser.toJSON();
    return userTransformed.secundario;
  });
};

module.exports = findAllUserUsers;
