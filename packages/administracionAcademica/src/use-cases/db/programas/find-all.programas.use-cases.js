const findAllProgramas = (
  findAllProgramaQuery,
  include,
  whereProgramasQuery,
) => async (identifierObj) => {
  const programas = await findAllProgramaQuery(
    identifierObj,
    {
      query: whereProgramasQuery,
      include,
    },
  );

  return programas;
};

module.exports = findAllProgramas;
