const { checkers } = require('@siiges-services/shared');

const findGroupAlumnosPrograma = (
  findOneProgramaQuery,
  findAllAlumnosQuery,
) => async (
  identifierObj,
) => {
  const { programaId } = identifierObj;

  const include = [{ association: 'persona' }];

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  const alumnosPrograma = await findAllAlumnosQuery(identifierObj, {
    include,
    strict: false,
  });

  return alumnosPrograma;
};

module.exports = findGroupAlumnosPrograma;
