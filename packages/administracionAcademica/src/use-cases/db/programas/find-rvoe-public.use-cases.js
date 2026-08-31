const findRvoePublic = (
  findAllProgramasQuery,
  includePublicRvoeQuery,
  wherePublicRvoeQuery,
) => async (filters) => {
  const { plantelId } = filters;

  const programas = await findAllProgramasQuery(
    null,
    {
      query: {
        ...wherePublicRvoeQuery,
        plantelId,
      },
      include: includePublicRvoeQuery,
    },
  );
  return programas;
};

module.exports = {
  findRvoePublic,
};
