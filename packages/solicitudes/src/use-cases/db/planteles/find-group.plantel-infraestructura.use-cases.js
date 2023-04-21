const findGroupPlantelInfraestructura = (findGroupQuery) => async (identifierObj) => {
  const include = [
    { association: 'infraestructura' },
  ];

  const plantel = await findGroupQuery(identifierObj, { include });

  return plantel;
};

console.log('estoy aqui');

module.exports = findGroupPlantelInfraestructura;
