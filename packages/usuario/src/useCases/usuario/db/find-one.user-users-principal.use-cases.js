const findOneUserUserPrincipal = (
  findAllUserUsersQuery,
  findOneUserQuery,
) => async (secundarioId) => {
  const query = { secundarioId };

  const userUsers = await findAllUserUsersQuery({}, { query });

  const include = [{ association: 'persona' }, { association: 'rol' }];
  const user = await findOneUserQuery({ id: userUsers[0].principalId }, { include });

  return user;
};

module.exports = findOneUserUserPrincipal;
