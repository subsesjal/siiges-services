const findInstitucionesByMunicipio = (
  findPlantelesQuery,
  findInstitucionesQuery,
) => async (filters) => {
  const { municipioId } = filters;

  const planteles = await findPlantelesQuery(null, {
    attributes: ['institucionId'],
    include: [{ association: 'domicilio', where: { municipioId } }],
    subQuery: false,
  });

  if (planteles.length === 0) {
    return [];
  }

  const institucionIds = [...new Set(planteles.map((p) => p.institucionId))];

  const instituciones = await findInstitucionesQuery(
    { id: institucionIds },
    { attributes: ['id', 'nombre'] },
  );
  return instituciones;
};

module.exports = findInstitucionesByMunicipio;
