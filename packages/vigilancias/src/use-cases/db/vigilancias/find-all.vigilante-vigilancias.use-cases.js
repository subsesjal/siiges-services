const findVigilanciasByVigilante = (
  findAllVigilanteVigilanciasQuery,
) => async ({ vigilanteId }) => {
  const include = [
    {
      association: 'vigilancia',
      include: [{
        association: 'programa',
        include: [{
          association: 'plantel',
          include: [
            { association: 'institucion' },
            { association: 'domicilio' },
          ],
        }],
      }],
    },
  ];

  const vigilanteVigilancias = await findAllVigilanteVigilanciasQuery({ vigilanteId }, { include });

  return vigilanteVigilancias;
};

module.exports = findVigilanciasByVigilante;
