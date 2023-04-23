const findGroupPlantelInfraestructura = (findAllQuery) => async (identifierObj) => {
  const plantelInfraestructuras = await findAllQuery(identifierObj);

  return plantelInfraestructuras;
};

module.exports = findGroupPlantelInfraestructura;
