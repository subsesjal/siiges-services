const { checkers } = require('@siiges-services/shared');

const findOneAsignatura = (findOneAsignaturaQuery) => async (
  identifierObj,
  attributes,
) => {
  const include = [
    { association: 'asignaturaId' },
    {
      association: 'programa',
      include: [{ association: 'programaId' }],
    },
  ];

  const asignatura = await findOneAsignaturaQuery(identifierObj, {
    attributes,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(asignatura, 'asignaturas', identifierObj.id);

  return asignatura;
};

module.exports = findOneAsignatura;
