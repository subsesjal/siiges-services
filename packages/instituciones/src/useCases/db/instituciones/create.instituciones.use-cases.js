const createInstitucion = (createQuery) => async (data) => {
  const newInstitucion = await createQuery(data);
  return newInstitucion;
};

module.exports = createInstitucion;
