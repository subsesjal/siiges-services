const createNotificacion = (createNotificacionQuery) => async (data) => {
  const newNotificacion = await createNotificacionQuery(data);
  return newNotificacion;
};

module.exports = createNotificacion;
