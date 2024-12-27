const createEquivalencia = (
  createSolicitudRevEquivQuery,
) => async ({ data }) => {
  const include = [
    {
      association: 'interesado',
      include: [
        { association: 'persona', include: [{ association: 'domicilio' }] },
        { association: 'institucionProcedencia' },
        { association: 'institucionDestino' },
      ],
    },
  ];

  const solicitudesRevEquiv = await createSolicitudRevEquivQuery(data, include);

  return solicitudesRevEquiv;
};

module.exports = createEquivalencia;
