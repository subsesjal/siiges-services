const findAllNiveles = (findAllNivelesQuery) => async () => {
  const niveles = await findAllNivelesQuery();

  return niveles;
};

module.exports = findAllNiveles;
