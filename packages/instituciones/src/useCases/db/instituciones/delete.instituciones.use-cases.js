const deleteInstitucion = (deleteQuery) => async (identifierObject) => {
  const institucionDeleted = await deleteQuery(identifierObject);
  return institucionDeleted;
};

module.exports = deleteInstitucion;
