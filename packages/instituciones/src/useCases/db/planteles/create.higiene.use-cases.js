const createHigiene = (createQuery) => async (data) => {
  const include = [{ association: 'higiene' }];

  const newHigiene = await createQuery(data, include);

  return newHigiene;
};

module.exports = createHigiene;
