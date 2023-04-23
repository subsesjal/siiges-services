const findAllHigienes = (findAllQuery) => async () => {
  const higienes = await findAllQuery();

  return higienes;
};

module.exports = findAllHigienes;
