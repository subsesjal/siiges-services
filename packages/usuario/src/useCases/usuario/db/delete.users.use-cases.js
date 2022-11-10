const deleteUser = (deleteQuery) => async (identifierObject) => {
  const userDeleted = await deleteQuery({ id: identifierObject });
  return userDeleted;
};

module.exports = deleteUser;
