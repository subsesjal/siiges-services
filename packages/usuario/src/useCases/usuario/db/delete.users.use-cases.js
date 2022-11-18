const deleteUser = (deleteQuery) => async (identifierObject) => {
  const userDeleted = await deleteQuery(identifierObject);
  return userDeleted;
};

module.exports = deleteUser;
