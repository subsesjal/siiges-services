const findGroupCicloEscolar = (
  findGroupCicloEscolarQuery,
) => async (identifierObj) => {
  const cicloEscolar = await findGroupCicloEscolarQuery(identifierObj);

  return cicloEscolar;
};

module.exports = { findGroupCicloEscolar };
