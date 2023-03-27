const { checkers } = require('@siiges-services/shared');

const findOneAsignatura = (findOneAsignaturaQuery) => async (
  identifierObj,
) => {
  const asignatura = await findOneAsignaturaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(asignatura, 'asignaturas', identifierObj.id);

  return asignatura;
};

module.exports = findOneAsignatura;
