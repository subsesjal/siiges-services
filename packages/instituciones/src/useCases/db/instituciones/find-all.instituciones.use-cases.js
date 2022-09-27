const findAllInstituciones = (findAllInstitucionesQuery) => async () => {
  const instituciones = await findAllInstitucionesQuery();
  return instituciones;
};

module.exports = findAllInstituciones;
