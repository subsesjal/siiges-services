const findOnePrograma = (
  findOneProgramaQuery,
  include,
) => async (identifierObj) => {
  const programa = await findOneProgramaQuery(
    identifierObj,
    {
      include,
    },
  );

  return programa;
};

module.exports = findOnePrograma;
