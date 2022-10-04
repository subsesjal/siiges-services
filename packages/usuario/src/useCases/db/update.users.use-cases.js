const updateUser = (updateQuery) => async (identifierObj, data) => {
  const usuarioUpdated = await updateQuery(identifierObj, data);
  return usuarioUpdated;
};

module.exports = updateUser;
