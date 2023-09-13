const findAllSeguridad = (findAllQuery) => async () => {
  const seguridadSistemas = await findAllQuery();

  return seguridadSistemas;
};

module.exports = findAllSeguridad;
