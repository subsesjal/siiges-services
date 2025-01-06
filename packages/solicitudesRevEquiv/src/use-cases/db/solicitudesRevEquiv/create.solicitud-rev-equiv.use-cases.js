const createEquivalencia = (
  createSolicitudRevEquivQuery,
  createAsignaturaAntEquivQuery,
  findOneSolicitudRevEquivQuery,
) => async ({ data }) => {
  const createInclude = [
    {
      association: 'interesado',
      include: [
        { association: 'persona', include: [{ association: 'domicilio' }] },
        { association: 'institucionProcedencia' },
        { association: 'institucionDestino' },
      ],
    },
  ];

  let newSolicitudRevEquiv = await createSolicitudRevEquivQuery(data, createInclude);
  newSolicitudRevEquiv = newSolicitudRevEquiv.toJSON();

  // Create promises for asignaturasAntecedentesEquivalentes
  const asignaturasPromises = data.interesado.asignaturasAntecedentesEquivalentes
    .map((asignatura) => createAsignaturaAntEquivQuery({
      interesadoId: newSolicitudRevEquiv.interesadoId,
      ...asignatura,
    }));

  // Await all promises
  await Promise.all(asignaturasPromises);

  const include = [
    {
      association: 'interesado',
      include: [
        { association: 'persona', include: [{ association: 'domicilio' }] },
        { association: 'institucionProcedencia' },
        {
          association: 'institucionDestino',
          include: [{
            association: 'programa',
            include: [{
              association: 'plantel',
              include: [{
                association: 'institucion',
              }],
            }],
          }],
        },
        { association: 'asignaturasAntecedenteEquivalente' },
      ],
    },
  ];

  return findOneSolicitudRevEquivQuery(
    { id: newSolicitudRevEquiv.id },
    { include, strict: false },
  );
};

module.exports = createEquivalencia;
