const findAllProgramas = (findAllProgramaQuery, include, whereProgramasQuery) => async () => {
  const getAllPrograms = await findAllProgramaQuery(whereProgramasQuery, { include });

  return getAllPrograms;
};

module.exports = findAllProgramas;
