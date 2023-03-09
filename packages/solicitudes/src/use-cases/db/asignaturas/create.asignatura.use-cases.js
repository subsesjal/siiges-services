const { checkers } = require('@siiges-services/shared');

const createAsignaturaPrograma = (findOneProgramaQuery, createAsignaturaQuery) => async (data) => {
  const programa = await findOneProgramaQuery({ id: data.programaId });

  checkers.throwErrorIfDataIsFalsy(programa);

  const newAsignaturaPrograma = await createAsignaturaQuery(data);
  return newAsignaturaPrograma;
};

module.exports = createAsignaturaPrograma;
