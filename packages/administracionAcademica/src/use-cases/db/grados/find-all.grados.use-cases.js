const findAllGrados = (
  findAllGradosQuery,
) => async () => {
  const grados = await findAllGradosQuery();

  return grados;
};

module.exports = { findAllGrados };
