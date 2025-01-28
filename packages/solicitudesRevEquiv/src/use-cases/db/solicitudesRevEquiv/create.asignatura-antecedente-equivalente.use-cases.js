const createAsignaturaAntecedenteEquivalente = (
  createAsignaturaAntecedenteEquivalenteQuery,
  createAsignaturaEquivalenteProgramaQuery,
  findOneAsignaturaQuery,
) => async (data) => {
  const asignaturaAntEquiv = await createAsignaturaAntecedenteEquivalenteQuery(data);

  if (!data.asignaturaId) return asignaturaAntEquiv;

  const asignaturaEquivalentePrograma = await createAsignaturaEquivalenteProgramaQuery({
    asignaturaAntecedenteEquivalenteId: asignaturaAntEquiv.id,
    asignaturaId: data.asignaturaId,
  });

  const asignatura = await findOneAsignaturaQuery(
    { id: data.asignaturaId },
  );

  return {
    ...asignaturaAntEquiv.dataValues,
    asignaturaEquivalentePrograma: {
      ...asignaturaEquivalentePrograma.dataValues,
      asignatura: { ...asignatura.dataValues },
    },
  };
};

module.exports = createAsignaturaAntecedenteEquivalente;
