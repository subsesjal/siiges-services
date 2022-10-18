const createInstitucion = (createQuery) => async (data) => {
  const include = [{ association: 'ratificacionesNombre' }];

  const newInstitucion = await createQuery(data, include);

  return newInstitucion;
};

module.exports = createInstitucion;
