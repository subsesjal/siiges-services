const createOneInstitucionesDgp = (
  createInstitucionesDgpQuery,
  findInstitucionByIdQuery,
) => async (data) => {
  const institucionesDgpPromises = data.map(async (item) => {
    const { institucionId, claveDgp, nombreInstitucionDgp } = item;

    const institucionExists = await findInstitucionByIdQuery({ id: institucionId });
    if (!institucionExists) return null;

    const newInstitucionDgp = await createInstitucionesDgpQuery({
      institucionId,
      claveDgp,
      nombreInstitucionDgp,
    });

    return newInstitucionDgp;
  });

  const institucionesDgp = await Promise.all(institucionesDgpPromises);

  return institucionesDgp;
};

module.exports = createOneInstitucionesDgp;
