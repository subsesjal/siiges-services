const updateUser = (updateQuery) => async (identifierObj, data) => {
  const usuarioUpdated = await updateQuery({ id: identifierObj }, data);
  return usuarioUpdated;
};

module.exports = updateUser;
