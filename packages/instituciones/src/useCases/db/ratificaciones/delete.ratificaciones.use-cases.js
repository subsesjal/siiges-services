const deleteRatificacion = (deleteQuery) => async (identifierObject) => {
  const { institucionId, ratificacionId } = identifierObject;

  const ratificacionDeleted = await deleteQuery({ id: ratificacionId, institucionId });
  return ratificacionDeleted;
};

module.exports = deleteRatificacion;
