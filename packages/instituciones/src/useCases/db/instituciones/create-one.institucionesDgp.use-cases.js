const createOneInstitucionesDgp = (
  createInstitucionesDgpQuery,
  findInstitucionByIdQuery,
  findOneInstitucionDgpQuery,
  updateInstitucionDgpQuery,
) => async (data) => {
  const institucionesDgpPromises = data.map(async (item) => {
    const { institucionId, claveDgp, nombreInstitucionDgp } = item;

    const institucionDgpExists = await findOneInstitucionDgpQuery({ claveDgp });
    if (institucionDgpExists) {
      const updatedInstitucionDgp = await updateInstitucionDgpQuery(
        { claveDgp },
        {
          institucionId,
          claveDgp,
          nombreInstitucionDgp,
        },
      );
      return updatedInstitucionDgp;
    }
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
