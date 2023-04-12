const findGroupPlantelHigiene = (findGroupQuery) => async (identifierObj) => {
  const include = [
    { association: 'higiene' },
  ];

  const plantel = await findGroupQuery(identifierObj, { include });

  return plantel;
};

module.exports = findGroupPlantelHigiene;
