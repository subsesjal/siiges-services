const findAllTipoInstituciones = (findAllTipoInstitucionesQuery) => async () => {
  const tipoAllTipoInstituciones = await findAllTipoInstitucionesQuery();

  return tipoAllTipoInstituciones;
};

module.exports = findAllTipoInstituciones;
