const createUser = (createQuery) => async (data, include) => {
  const newUser = await createQuery(data, { include });
  return newUser;
};

module.exports = createUser;
