const deleteAsignaturaAntecedenteEquivalente = (
  deleteAsignaturaAntecedenteEquivalenteQuery,
) => async (identifierObj) => {
  const asignaturaAntecedenteEquivalenteDelete = await
  deleteAsignaturaAntecedenteEquivalenteQuery(identifierObj);

  return asignaturaAntecedenteEquivalenteDelete;
};

module.exports = deleteAsignaturaAntecedenteEquivalente;
