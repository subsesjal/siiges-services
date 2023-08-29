const findAllEdificiosNiveles = (findAllQuery) => async () => {
  const edificiosNiveles = await findAllQuery();

  return edificiosNiveles;
};

module.exports = findAllEdificiosNiveles;
