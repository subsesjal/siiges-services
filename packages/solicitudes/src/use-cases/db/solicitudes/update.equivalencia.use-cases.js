const updateEquivalencia = (updateEquivalenciaQuery) => async (equiv, solicitudRevEquivId) => {
  const equivalencia = await updateEquivalenciaQuery({ id: solicitudRevEquivId }, equiv, {
    include: [
      {
        association: 'interesado',
        include: [
          { association: 'persona', include: [{ association: 'domicilio' }] },
          { association: 'institucionProcedencia' },
          { association: 'institucionDestino' },
        ],
      },
    ],
  });
  return equivalencia;
};

module.exports = updateEquivalencia;
