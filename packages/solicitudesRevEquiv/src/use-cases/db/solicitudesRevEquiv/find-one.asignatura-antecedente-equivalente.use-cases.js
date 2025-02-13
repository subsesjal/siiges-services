const { checkers } = require('@siiges-services/shared');

const findOneAsignaturaAntecedenteEquivalente = (
  findOneAsignaturaAntecedenteEquivalenteQuery,
) => async (identifierObj) => {
  const include = [
    {
      association: 'asignaturaEquivalentePrograma',
      include: [
        {
          association: 'asignatura',
        },
      ],
    },
  ];

  const asignaturaAntecedenteEquivalente = await findOneAsignaturaAntecedenteEquivalenteQuery(
    identifierObj,
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(
    asignaturaAntecedenteEquivalente,
    'solicitudes-rev-equiv',
    identifierObj.id,
  );

  return asignaturaAntecedenteEquivalente;
};

module.exports = findOneAsignaturaAntecedenteEquivalente;
