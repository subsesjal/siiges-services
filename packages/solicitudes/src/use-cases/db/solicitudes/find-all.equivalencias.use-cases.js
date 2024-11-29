const findAllEquivalencias = (
  findAllEquivalenciasQuery,
) => async () => {
  const equivalencias = await findAllEquivalenciasQuery(null, {
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
  return equivalencias;
};

module.exports = findAllEquivalencias;
