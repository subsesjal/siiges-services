const findVigilanciasByVigilante = (
  findAllVigilanteVigilanciasQuery,
) => async ({ vigilanteId }) => {
  const include = [
    {
      association: 'vigilancia',
      include: [{
        association: 'programa',
      }],
    },
  ];

  const vigilanteVigilancias = await findAllVigilanteVigilanciasQuery({ vigilanteId }, { include });

  return vigilanteVigilancias;
};

module.exports = findVigilanciasByVigilante;
