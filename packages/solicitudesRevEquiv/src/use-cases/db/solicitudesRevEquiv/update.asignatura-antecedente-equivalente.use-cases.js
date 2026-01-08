const { checkers } = require('@siiges-services/shared');

const updateAsignaturaAntecedenteEquivalente = (
  updateAndFindAsignaturaAntecedenteEquivalenteQuery,
  findOneAsignaturaAntecedenteEquivalenteQuery,
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

  await updateAndFindAsignaturaAntecedenteEquivalenteQuery(
    identifierObj,
    data,
  );

  const updatedAsignaturaAntEquiv = await findOneAsignaturaAntecedenteEquivalenteQuery(
    identifierObj,
    { include },
  );

  return updatedAsignaturaAntEquiv;
};

module.exports = updateAsignaturaAntecedenteEquivalente;
