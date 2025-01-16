const createEquivalencia = (
  createSolicitudRevEquivQuery,
  createAsignaturaAntEquivQuery,
  findOneSolicitudRevEquivQuery,
  createAsignaturaEquivProgrQuery,
  createInstitucionDestinoProgramaQuery,
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

  if (data.interesado.institucionDestino.programaId) {
    createInstitucionDestinoProgramaQuery({
      institucionDestinoId: newSolicitudRevEquiv.interesado.institucionDestino.id,
      programaId: data.interesado.institucionDestino.programaId,
    });
  }

  // Create promises for asignaturasAntecedentesEquivalentes
  const asignaturasPromises = data.interesado.asignaturasAntecedentesEquivalentes
    .map(async (asignatura) => {
      const asignaturaAntEquiv = await createAsignaturaAntEquivQuery({
        interesadoId: newSolicitudRevEquiv.interesadoId,
        ...asignatura,
      });

      // Skip if asignaturaId is not present
      if (!asignatura.asignaturaId) return asignaturaAntEquiv;

      // Create the promise for createAsignaturaEquivProgrQuery
      return createAsignaturaEquivProgrQuery({
        asignaturaAntecedenteEquivalenteId: asignaturaAntEquiv.id,
        asignaturaId: asignatura.asignaturaId,
      });
    });

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
            association: 'institucionDestinoPrograma',
            include: [{
              association: 'programa',
              include: [{
                association: 'plantel',
                include: [{
                  association: 'institucion',
                }],
              }],
            }],
          }],
        },
        {
          association: 'asignaturasAntecedenteEquivalente',
          include: [
            { association: 'asignaturaEquivalentePrograma' },
          ],
        },
      ],
    },
  ];

  return findOneSolicitudRevEquivQuery(
    { id: newSolicitudRevEquiv.id },
    { include, strict: false },
  );
};

module.exports = createEquivalencia;
