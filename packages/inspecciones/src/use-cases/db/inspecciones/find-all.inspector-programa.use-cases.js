const findAllInspectoresProgramas = (findAllInspectoresQuery) => async () => {
  const include = [
    { association: 'persona' },
    {
      association: 'inspectorPrograma',
      include: [
        { association: 'inspeccion' },
      ],
    },
  ];

  const inspectores = await findAllInspectoresQuery(null, { include });

  // Iterate through each inspector and calculate inspeccionesCompletadas and inspeccionesPendientes
  const modifiedInspectores = inspectores.map((inspector) => {
    const inspecciones = inspector.inspectorPrograma;
    let inspeccionesCompletadas = 0;
    let inspeccionesPendientes = 0;

    inspecciones.forEach((inspeccion) => {
      if (inspeccion.inspeccion.estatusInspeccionId === 3) {
        inspeccionesCompletadas += 1;
      } else {
        inspeccionesPendientes += 1;
      }
    });

    // Add the calculated values to the inspector object
    // eslint-disable-next-line no-param-reassign
    inspector.dataValues.inspeccionesCompletadas = inspeccionesCompletadas;
    // eslint-disable-next-line no-param-reassign
    inspector.dataValues.inspeccionesPendientes = inspeccionesPendientes;

    return inspector;
  });

  return modifiedInspectores;
};

module.exports = findAllInspectoresProgramas;
