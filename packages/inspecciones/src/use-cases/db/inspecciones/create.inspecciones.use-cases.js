const createInspecciones = (createInspeccionesQuery) => async (data) => {
  const inspecciones = await createInspeccionesQuery(data);
  return inspecciones;
};

module.exports = createInspecciones;
