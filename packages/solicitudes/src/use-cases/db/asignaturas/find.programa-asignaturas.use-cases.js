const { checkers } = require('@siiges-services/shared');

const findProgramaAsignaturas = (
  findOneProgramaQuery,
  findProgramaAsignaturasQuery,
) => async (identifierObj, query) => {
  const { programaId } = identifierObj;

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  let asignaturas = [];

  if (query.grado) {
    const asignaturasTipo1 = await findProgramaAsignaturasQuery(identifierObj, {
      query: {
        tipo: 1,
        gradoId: query.grado,
      },
    });

    const asignaturasTipo2 = await findProgramaAsignaturasQuery(identifierObj, {
      query: {
        tipo: 2,
        gradoId: 25,
      },
    });

    asignaturas = [...asignaturasTipo1, ...asignaturasTipo2];
  } else {
    asignaturas = await findProgramaAsignaturasQuery(identifierObj, { query });
  }

  return asignaturas;
};

module.exports = findProgramaAsignaturas;
