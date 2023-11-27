const findGroupAcuerdos = (findAllAcuerdosQuery) => async (query) => {
  const acuerdos = await findAllAcuerdosQuery(null, { query });

  return acuerdos;
};

module.exports = { findGroupAcuerdos };
