const findGroupCicloEscolar = (
  findGroupCicloEscolarQuery,

) => async (identifierObj) => {
  const grupos = await findGroupCicloEscolarQuery(identifierObj);
  return grupos;s
};

module.exports = { findGroupCicloEscolar };
