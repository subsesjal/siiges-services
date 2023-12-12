const findVigilanciasByVigilante = (findAllVigilanciasQuery) => async ({ vigilanteId }) => {
  const findvigilancias = await findAllVigilanciasQuery({ vigilanteId });

  return findvigilancias;
};

module.exports = findVigilanciasByVigilante;
