const { checkers } = require('@siiges-services/shared');

const updateAsignaturaAntecedenteEquivalente = (
  updateAndFindAsignaturaAntecedenteEquivalenteQuery,
  findOneAsignaturaAntecedenteEquivalenteQuery,
  updateAsignaturaEquivalenteProgramaQuery,
  findOneAsignaturaEquivalenteProgramaQuery,
) => async (identifierObj, data) => {
  const include = [
    {
      association: 'asignaturaEquivalentePrograma',
      include: [
        { association: 'asignatura' },
      ],
    },
  ];

  const asignaturaAntEquiv = await findOneAsignaturaAntecedenteEquivalenteQuery(identifierObj);

  checkers.throwErrorIfDataIsFalsy(
    asignaturaAntEquiv,
    'asignaturas_antecedente_equivalente',
    identifierObj.id,
  );

  // Actualizar la tabla principal
  await updateAndFindAsignaturaAntecedenteEquivalenteQuery(
    identifierObj,
    data,
  );

  // Si se envía un nuevo asignaturaId, actualizar la tabla asignatura_equivalente_programa
  if (data.asignaturaId) {
    // Validar que exista el registro en asignatura_equivalente_programa
    const asignaturaEquivalentePrograma = await findOneAsignaturaEquivalenteProgramaQuery({
      asignaturaAntecedenteEquivalenteId: asignaturaAntEquiv.id,
    });

    if (!asignaturaEquivalentePrograma) {
      throw new Error(
        `No existe registro en asignatura_equivalente_programa para asignaturaAntecedenteEquivalenteId: ${asignaturaAntEquiv.id}`,
      );
    }

    // Actualizar con el nuevo asignaturaId
    await updateAsignaturaEquivalenteProgramaQuery(
      { id: asignaturaEquivalentePrograma.id },
      { asignaturaId: data.asignaturaId },
    );
  }

  const updatedAsignaturaAntEquiv = await findOneAsignaturaAntecedenteEquivalenteQuery(
    identifierObj,
    { include },
  );

  return updatedAsignaturaAntEquiv;
};

module.exports = updateAsignaturaAntecedenteEquivalente;
