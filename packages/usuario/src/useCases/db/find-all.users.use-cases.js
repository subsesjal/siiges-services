const findAllUsers = (findAllQuery) => async () => {
  const users = await findAllQuery();
  return users;
};

module.exports = findAllUsers;
