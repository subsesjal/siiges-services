const { checkers } = require('@siiges-services/shared');

const createAsignaturaPrograma = (
  findOneProgramaQuery,
  findOneGradoQuery,
  createAsignaturaQuery,
) => async (data) => {
  const validatorQuery = {
    Programa: [data.programaId, findOneProgramaQuery],
    Grado: [data.gradoId, findOneGradoQuery],
  };
  await checkers.findValidator(validatorQuery);

  const newAsignaturaPrograma = await createAsignaturaQuery(data);
  return newAsignaturaPrograma;
};

module.exports = createAsignaturaPrograma;
