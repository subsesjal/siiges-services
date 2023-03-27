const { checkers } = require('@siiges-services/shared');

const findOneDocente = (findOneDocenteQuery) => async (
  identifierObj,
) => {
  console.log(identifierObj);
  const include = [
    { association: 'persona' },
    {
      association: 'asignaturasDocentes',
      include: [
        { association: 'asignatura' },
      ],
    },
  ];

  const docente = await findOneDocenteQuery(identifierObj, { include });

  console.log(docente);

  checkers.throwErrorIfDataIsFalsy(docente, 'docentes', identifierObj.id);

  return docente;
};

module.exports = findOneDocente;
