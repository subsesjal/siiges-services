const createSolicitud = (createSolicitudQuery) => async (data) => {
  const include = [{ association: 'programa' }];

  const newSolicitud = await createSolicitudQuery(data, include);

  return newSolicitud;
};

module.exports = createSolicitud;
