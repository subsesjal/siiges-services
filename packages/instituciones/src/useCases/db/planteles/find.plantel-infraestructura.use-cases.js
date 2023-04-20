const findPlantelInfraestructura = (findGroupQuery) => async (identifierObj) => {
  const include = [
    { association: 'infraestructura' },
  ];

  const plantel = await findGroupQuery(identifierObj, { include });

  return plantel;
};

module.exports = findPlantelInfraestructura;
