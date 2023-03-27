const { checkers } = require('@siiges-services/shared');

const findOneDocente = (findOneDocenteQuery) => async (
  identifierObj,
) => {
  const include = [
    { association: 'persona' },
    {
      association: 'asignaturasDocentes',
      include: [
        { association: 'asignatura' },
      ],
    },
  ];

  const docente = await findOneDocenteQuery(identifierObj, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(docente, 'docentes', identifierObj.id);

  return docente;
};

module.exports = findOneDocente;
