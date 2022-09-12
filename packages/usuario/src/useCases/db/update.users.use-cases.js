const updateUser = (updateQuery) => async (identifierObj, data, include) => {
  const usuarioUpdated = await updateQuery(identifierObj, data, include);
  return usuarioUpdated;
};

module.exports = updateUser;
