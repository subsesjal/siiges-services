const TIPO_TRAMITE_PREFIX = {
  1: 'EQP',
  2: 'EQT',
  3: 'REP',
  4: 'RET',
  5: 'EQD',
  6: 'RED',
};

const createEquivalencia = (
  createSolicitudRevEquivQuery,
  createAsignaturaAntEquivQuery,
  findOneSolicitudRevEquivQuery,
  createAsignaturaEquivProgrQuery,
  createInstitucionDestinoProgramaQuery,
) => async ({ data }) => {
  const inputData = { ...data };

  const year = new Date().getFullYear();
  const count = 1;
  const prefix = TIPO_TRAMITE_PREFIX[inputData.tipoTramiteId] || 'XX';
  const folio = `F${prefix}${year}${count}`;
  inputData.folio = folio;

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

  let newSolicitudRevEquiv = await createSolicitudRevEquivQuery(inputData, createInclude);
  newSolicitudRevEquiv = newSolicitudRevEquiv.toJSON();

  if (inputData.interesado.institucionDestino?.programaId) {
    await createInstitucionDestinoProgramaQuery({
      institucionDestinoId: newSolicitudRevEquiv.interesado.institucionDestino.id,
      programaId: inputData.interesado.institucionDestino.programaId,
    });
  }

  const asignaturas = inputData.interesado.asignaturasAntecedentesEquivalentes;

  if (Array.isArray(asignaturas)) {
    const asignaturasPromises = asignaturas.map(async (asignatura) => {
      const asignaturaAntEquiv = await createAsignaturaAntEquivQuery({
        interesadoId: newSolicitudRevEquiv.interesadoId,
        ...asignatura,
      });

      if (!asignatura.asignaturaId) return asignaturaAntEquiv;

      return createAsignaturaEquivProgrQuery({
        asignaturaAntecedenteEquivalenteId: asignaturaAntEquiv.id,
        asignaturaId: asignatura.asignaturaId,
      });
    });

    await Promise.all(asignaturasPromises);
  }

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
