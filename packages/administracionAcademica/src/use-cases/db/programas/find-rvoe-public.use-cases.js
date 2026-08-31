const ESTADO_JALISCO_ID = 14;

const findRvoePublic = (
  findAllProgramasQuery,
  includePublicRvoeQuery,
  wherePublicRvoeQuery,
) => async (filters) => {
  const { plantelId } = filters;

  const programas = await findAllProgramasQuery(
    null,
    {
      query: {
        ...wherePublicRvoeQuery,
        plantelId,
      },
      include: includePublicRvoeQuery,
    },
  );
  return programas;
};

const findMunicipiosJalisco = (
  findMunicipiosQuery,
) => async () => {
  const municipios = await findMunicipiosQuery(
    { estadoId: ESTADO_JALISCO_ID },
    { attributes: ['id', 'nombre'] },
  );
  return municipios;
};

const findInstitucionesByMunicipio = (
  findPlantelesQuery,
  findInstitucionesQuery,
) => async (filters) => {
  const { municipioId } = filters;

  const planteles = await findPlantelesQuery(
    null,
    {
      attributes: ['institucionId'],
      include: [
        {
          association: 'domicilio',
          where: { municipioId },
        },
      ],
      subQuery: false,
    },
  );

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

const findPlantelesByInstitucion = (
  findPlantelesQuery,
) => async (filters) => {
  const { institucionId } = filters;

  const planteles = await findPlantelesQuery(
    { institucionId },
    {
      attributes: ['id', 'claveCentroTrabajo'],
      include: [
        { association: 'institucion', attributes: ['nombre'] },
        { association: 'domicilio', attributes: ['calle', 'numeroExterior'] },
      ],
    },
  );
  return planteles;
};

module.exports = {
  findRvoePublic,
  findMunicipiosJalisco,
  findInstitucionesByMunicipio,
  findPlantelesByInstitucion,
};
