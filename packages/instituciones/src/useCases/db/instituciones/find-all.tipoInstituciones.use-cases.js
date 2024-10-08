const findAllTipoInstituciones = (findAllTipoInstitucionesQuery) => async () => {
  // No especificamos atributos para traer todos los campos
  const tipoAllTipoInstituciones = await findAllTipoInstitucionesQuery();

  return tipoAllTipoInstituciones;
};

module.exports = findAllTipoInstituciones;
