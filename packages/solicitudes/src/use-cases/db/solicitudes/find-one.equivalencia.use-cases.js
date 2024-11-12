const findOneEquivalencia = (findOneEquivalenciaQuery) => async (identifierObj) => {
  const equivalencia = await findOneEquivalenciaQuery(identifierObj, {
    include: [
      {
        association: 'interesado',
        include: [
          { association: 'persona', include: [{ association: 'domicilio' }] },
          { association: 'institucionProcedencia' },
          { association: 'institucionDestino' },
          { association: 'asignaturasAntecedentes' },
          { association: 'asignaturasEquivalentes' },
        ],
      },
    ],
  });
  return equivalencia;
};

module.exports = findOneEquivalencia;
