const createAsignaturaAntecedenteEquivalente = (
  createAsignaturaAntecedenteEquivalenteQuery,
  createAsignaturaEquivalenteProgramaQuery,
) => async (data) => {
  const asignaturaAntEquiv = await createAsignaturaAntecedenteEquivalenteQuery(data);

  if (!data.asignaturaId) return asignaturaAntEquiv;

  const respuesta2 = await createAsignaturaEquivalenteProgramaQuery({
    asignaturaAntecedenteEquivalenteId: asignaturaAntEquiv.id,
    asignaturaId: data.asignaturaId,
  });
  console.log('Asignatura Equivalente Programa:', respuesta2.toJSON());

  return { asignaturaAntEquiv, respuesta2 };
};

module.exports = createAsignaturaAntecedenteEquivalente;
