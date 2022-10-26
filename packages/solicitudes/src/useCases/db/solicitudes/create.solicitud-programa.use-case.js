const createSolicitud = (createSolicitudQuery) => async (data) => {
  const include = [{ association: 'programa' }];

  const newData = { ...data, folio: 'LI202012123534' };

  const newSolicitud = await createSolicitudQuery(newData, include);

  return newSolicitud;
};

module.exports = createSolicitud;
