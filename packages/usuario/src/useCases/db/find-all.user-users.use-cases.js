const findAllUserUsers = (findAllUserUsersQuery, findOneUserQuery) => async (principalId) => {
  const query = { principalId };

  const userUsers = await findAllUserUsersQuery({ query });

  const usersDetail = await Promise.all(userUsers.map(async (userUser) => {
    const include = [{ association: 'persona' }, { association: 'rol' }];
    const user = await findOneUserQuery({ id: userUser.secundarioId }, { include });
    return user;
  }));

  return usersDetail;
};

module.exports = findAllUserUsers;
