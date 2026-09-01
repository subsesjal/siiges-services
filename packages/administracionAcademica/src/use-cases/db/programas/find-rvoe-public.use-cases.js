const findRvoePublic = (
  findAllProgramasQuery,
  includePublicRvoeQuery,
  wherePublicRvoeQuery,
) => async (filters) => {
  const { plantelId } = filters;

  const programas = await findAllProgramasQuery(
    null,
    {
      attributes: ['id', 'nombre', 'acuerdoRvoe', 'fechaSurteEfecto', 'vigencia'],
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
