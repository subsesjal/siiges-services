const createInspecciones = (createQuery) => async (data) => {
  const include = [{ association: 'estatusInspecciones' }];

  const newInspecciones = await createQuery(data, include);

  return newInspecciones;
};

module.exports = createInspecciones;
