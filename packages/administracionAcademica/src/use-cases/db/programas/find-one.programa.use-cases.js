const findOnePrograma = (
  findOneProgramaQuery,
  include,
  whereProgramasQuery,
) => async (identifierObj) => {
  const programa = await findOneProgramaQuery(
    identifierObj,
    {
      query: whereProgramasQuery,
      include,
    },
  );

  return programa;
};

module.exports = findOnePrograma;
