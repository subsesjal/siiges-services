const findGroupCicloEscolar = (
  findGroupCicloEscolarQuery,
  whereCicloEscolarQuery,
) => async (identifierObj) => {
  const cicloEscolar = await findGroupCicloEscolarQuery(identifierObj, {
    query: whereCicloEscolarQuery,
  });

  return cicloEscolar;
};

module.exports = { findGroupCicloEscolar };
