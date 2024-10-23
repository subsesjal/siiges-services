const findAllEstados = (findAllEstadosQuery) => async () => {
  const estados = await findAllEstadosQuery();

  return estados;
};

module.exports = findAllEstados;
