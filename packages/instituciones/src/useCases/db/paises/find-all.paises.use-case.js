const findAllPaises = (findAllPaisesQuery) => async () => {
  const paises = await findAllPaisesQuery();

  return paises;
};

module.exports = findAllPaises;
