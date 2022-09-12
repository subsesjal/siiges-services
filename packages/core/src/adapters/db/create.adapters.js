const createQuery = (model) => async (data, include) => {
  const newEntry = await model.create(data, {
    include,
  });
  return newEntry;
};

module.exports = createQuery;
