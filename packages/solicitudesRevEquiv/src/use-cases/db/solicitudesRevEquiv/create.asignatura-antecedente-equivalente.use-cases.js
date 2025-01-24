const createAsignaturaAntecedenteEquivalente = (
  createAsignaturaAntecedenteEquivalenteQuery,
  createAsignaturaEquivalenteProgramaQuery,
  findOneAsignaturaQuery,
) => async (data) => {
  const asignaturaAntEquiv = await createAsignaturaAntecedenteEquivalenteQuery(data);

  if (!data.asignaturaId) return asignaturaAntEquiv;

  const programaAntecedente = await createAsignaturaEquivalenteProgramaQuery({
    asignaturaAntecedenteEquivalenteId: asignaturaAntEquiv.id,
    asignaturaId: data.asignaturaId,
  });
  const asignatura = await findOneAsignaturaQuery(
    { id: data.asignaturaId },
  );

  return {
    interesado: {
      asignaturaAntEquiv,
      programaAntecedente: {
        programaAntecedente,
        asignatura: {
          asignatura,
        },
      },
    },
  };
};

module.exports = createAsignaturaAntecedenteEquivalente;
