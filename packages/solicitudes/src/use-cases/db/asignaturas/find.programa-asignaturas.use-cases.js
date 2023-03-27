const { checkers } = require('@siiges-services/shared');

const findProgramaAsignaturas = (
  findOneProgramaQuery,
  findProgramaAsignaturaQuery,
) => async (identifierObj) => {
  const { programaId } = identifierObj;

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  const asignaturas = await findProgramaAsignaturaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(asignaturas, 'asignaturas', identifierObj.id);

  return asignaturas;
};

module.exports = findProgramaAsignaturas;
