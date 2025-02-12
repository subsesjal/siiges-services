const findAllPaises = (findAllPaisesQuery) => async () => {
  const paises = await findAllPaisesQuery();
  console.log(paises);

  return paises;
};

module.exports = findAllPaises;
