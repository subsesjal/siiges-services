const createQuery = (model) => async (data, include = undefined) => {
  const newEntry = await model.create(data, {
    include,
  });
  return newEntry;
};

module.exports = createQuery;
