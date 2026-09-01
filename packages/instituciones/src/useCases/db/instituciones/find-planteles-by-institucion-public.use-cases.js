const findPlantelesByInstitucionPublic = (
  findPlantelesQuery,
) => async (filters) => {
  const { institucionId } = filters;

  const planteles = await findPlantelesQuery(
    { institucionId },
    {
      attributes: ['id', 'claveCentroTrabajo'],
      include: [
        {
          association: 'domicilio',
          attributes: ['calle', 'numeroExterior'],
        },
      ],
    },
  );
  return planteles;
};

module.exports = findPlantelesByInstitucionPublic;
