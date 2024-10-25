const findPlantelProgramas = (
  findPlantelProgramasQuery,
  include,
  whereProgramasQuery,
) => async (identifierObj) => {
  const where = whereProgramasQuery;
  if (Array.isArray(identifierObj)) {
    where.plantelId = identifierObj;
  } else {
    where.plantelId = identifierObj.plantelId;
  }

  return findPlantelProgramasQuery(where, { include });
};

module.exports = { findPlantelProgramas };
